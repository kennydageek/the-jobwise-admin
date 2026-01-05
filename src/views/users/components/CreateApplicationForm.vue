<template>
  <div class="px-6 md:pl-20 md:pr-40 mt-10 md:mt-10">
    <p class="cursor-pointer" @click="$router.back()">&larr; Back</p>
    <p class="text-[#021863] text-2xl font-semibold">Job Application Form</p>

    <form
      @submit.prevent="createJobApplication"
      class="flex flex-col gap-8 justify-between relative mt-10 shadow-md py-5 pb-10 rounded-lg px-6"
    >
      <jw-input
        label="Job Title"
        type="text"
        class="w-full"
        v-model="form.job_title"
        required
      />

      <jw-input
        label="Job link"
        type="text"
        class="w-full"
        v-model="form.job_link"
      />

      <jw-input
        label="Date applied"
        type="date"
        class="w-full"
        v-model="form.date_applied"
      />

      <jw-input
        label="Company name"
        type="text"
        class="w-full"
        v-model="form.company_name"
        required
      />

      <jw-input
        label="Salary range"
        type="text"
        class="w-full"
        v-model="form.salary_range"
      />

      <select
        name=""
        id=""
        class="px-6 py-3 border border-[#ccc] rounded"
        v-model="form.job_level"
      >
        <option value="" disabled>Select Level</option>
        <option value="Entry">Entry Level</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <select
        name=""
        id=""
        class="px-6 py-3 border border-[#ccc] rounded"
        v-model="form.location_type"
      >
        <option value="" disabled>Location Type</option>
        <option value="Remote">Remote</option>
        <option value="Onsite">Onsite</option>
        <option value="Hybrid">Hybrid</option>
      </select>

      <div v-if="showUploadResume">
        <div class="flex justify-between">
          <p>Upload Resume Used</p>

          <p
            class="underline text-secondary-100 cursor-pointer"
            @click="showUploadResume = false"
          >
            Type Resume Instead
          </p>
        </div>

        <p class="text-red-600" ref="fileErrMessageRef">
          {{ fileErrMessage }}
        </p>
        <file-upload
          class="mt-5"
          @file-selected="handleFileSelected"
          :key="fileUploadIndex"
        />
      </div>
      <div class="" v-else>
        <div class="flex justify-between mb-5">
          <p>Resume</p>
          <p
            class="underline text-secondary-100 cursor-pointer"
            @click="showUploadResume = true"
          >
            Upload Resume
          </p>
        </div>
        <editor
          v-model="form.resume_description"
          placeholder="Enter resume"
          editorStyle="height: 320px"
        />
      </div>

      <div>
        <p>Job Description</p>
        <editor
          v-model="form.job_description"
          placeholder="Enter Job description"
          editorStyle="height: 320px"
        />
      </div>

      <div>
        <p>Cover letter</p>
        <editor
          v-model="form.cover_letter"
          placeholder="Enter cover letter"
          editorStyle="height: 320px"
        />
      </div>

      <div class="flex justify-end">
        <button
          class="bg-[#5270ED] text-[#fff] py-3 px-4 rounded text-xs"
          :disabled="loading"
        >
          <jw-spinner v-if="loading" />
          <span v-else> Apply for Subscriber</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import FileUpload from '@/components/FileUpload.vue';
import JwInput from '@/components/JwInput.vue';
import Editor from 'primevue/editor';
import Dialog from 'primevue/dialog';
import JwSpinner from '@/components/JwSpinner.vue';
import { useToast } from 'vue-toastification';
import dayjs from 'dayjs';
import {
  FileUploadService,
  JobApplicationService,
  UserService,
} from '@/services';
import { useRoute } from 'vue-router';
const loading = ref(false);
const showUploadResume = ref(false);
const userData = ref({});
const jobProfile = ref({});
const fileErrMessage = ref('');
const selectedFile = ref();
const toast = useToast();
const fileUploadIndex = ref(0);
const userTier = computed(() => {
  const res = {
    tier: '',
    created_at: '',
  };
  if (userData.value.subscription) {
    const subPlan = userData.value.subscription?.subscription_plan || {};
    res.tier = `${Helper.capitalizeWord(subPlan.name)} Plan (Tier ${
      subPlan.tier
    })`;
    res.created_at = dayjs(subPlan.created_at).format('MMMM DD, YYYY');
  }

  return res;
});

const form = ref({
  user_id: null,
  job_profile_id: null,
  company_name: '',
  job_title: '',
  job_level: '',
  location_type: '',
  job_link: '',
  date_applied: dayjs().format('YYYY-MM-DD'),
  salary_range: '',
  job_description: '',
  resume_description: '',
});

const route = useRoute();

const handleFileSelected = (e) => {
  selectedFile.value = e;
};

async function createJobApplication() {
  loading.value = true;
  try {
    if (form.value.job_description === '') {
      toast.error('Job description is compulsory');
      loading.value = false;
      return;
    }

    fileErrMessage.value = '';
    const formData = new FormData();

    if (selectedFile.value) {
      formData.append('file', selectedFile.value);
      const res = await FileUploadService.upload(formData);
      const payload = {
        ...form.value,
        user_id: route.params.id,
        resume_used: res.file_key,
      };
      await JobApplicationService.createApplication(payload);
      form.value = {
        user_id: route.params.id,
        job_profile_id: null,
        company_name: '',
        job_title: '',
        job_level: '',
        job_link: '',
        date_applied: dayjs().format('YYYY-MM-DD'),
        salary_range: '',
        job_description: '',
        resume_description: '',
      };
      fileUploadIndex.value += 1;
    } else {
      const payload = {
        ...form.value,
        user_id: route.params.id,
      };
      await JobApplicationService.createApplication(payload);
      toast.success('Job Application created successfully');
      form.value = {
        user_id: null,
        job_profile_id: null,
        company_name: '',
        job_title: '',
        job_level: '',
        job_link: '',
        date_applied: dayjs().format('YYYY-MM-DD'),
        salary_range: '',
        job_description: '',
        resume_description: '',
      };
      fileUploadIndex.value += 1;
    }

    loading.value = false;
  } catch (error) {
    console.log(error);
  } finally {
    if (route.name !== 'application-edit') {
      getUserDetails();
    }
  }
  loading.value = false;
}

onMounted(() => {
  //   console.log(route.name);
  //   if (route.name !== 'application-edit') {
  //     getUserDetails();
  //   }
  //   fetchAJobApplication();
});

async function getUserDetails() {
  const data = await UserService.fetchAUser(route.params.id);
  userData.value = data.payload || {};
  form.value.user_id = userData.value.user_id;

  if (userData.value.job_profile) {
    const id = userData.value.job_profile?.job_profile_id;
    form.value.job_profile_id = id;
    const res = await JobApplicationService.fetchJobProfileById(id);
    jobProfile.value = res || {};
  } else {
    toast.error('This user does not have a job profile');
  }
}

const fetchAJobApplication = async () => {
  const data = await JobApplicationService.fetchAJobApplication(
    route.params.id
  );

  form.value = { ...data.payload };
  form.value.date_applied = dayjs(form.value.date_applied).format('YYYY-MM-DD');

  console.log(form.value);
};
</script>

<style lang="scss" scoped></style>
