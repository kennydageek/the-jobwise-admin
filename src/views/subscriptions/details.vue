<template>
  <page-heading title="Subscriptions" />
  <div class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]">
    <p @click="$router.back()" class="cursor-pointer mb-3">&larr; Back</p>

    <p class="text-2xl font-semibold text-primary-100">
      Tier {{ subscriptionData?.subscription_plan?.tier }}
    </p>
    <div class="flex flex-col md:flex-row justify-between relative">
      <p class="text-primary-100 mt-4 mb-2.5">
        Paid on {{ $dayjs(subscriptionData.created_at).format('DD MMM, YYYY') }}
      </p>
      <div class="flex gap-4">
        <button
          class="rounded-lg py-2.5 px-6 border border-[#C3CCD2] text-sm text-[#fff] font-semibold w-[132px] cursor-default"
          :class="
            subscriptionData.status === 'active'
              ? 'bg-[#09C028]'
              : 'bg-slate-400'
          "
        >
          {{ subscriptionData.status }}
        </button>
      </div>
    </div>
  </div>

  <div class="px-6 md:pl-20 md:pr-40 mt-10 md:mt-10">
    <div
      class="p-8 border border-[#F0F1F3] shadow-sm shadow-[#1A1C210D] rounded-lg flex justify-between"
    >
      <div class="">
        <p class="text-sm text-[#333843] font-semibold">
          {{ subscriptionData?.user?.first_name }}

          {{ subscriptionData?.user?.last_name }}
        </p>
        <p class="text-[#667085] text-xs mt-3">
          {{ $dayjs(subscriptionData.created_at).format('DD MMM, YYYY') }}
        </p>
        <p class="text-[#667085] text-xs mt-[6px]">
          {{ subscriptionData?.user?.phone_number }}
          {{ subscriptionData?.user?.email }}
        </p>
      </div>
      <div class="">
        <div class="bg-[#F4F5F6] py-2 px-3 rounded-lg w-[58px]">
          <p class="text-[#333843] text-xs font-semibold text-center">
            Tier {{ subscriptionData?.subscription_plan?.tier }}
          </p>
        </div>
        <div class="mt-2">
          <p class="text-xs text-[#667085] font-medium">Total Amount</p>
          <p class="text-xl text-[#333843] font-bold mt-2">
            $ {{ subscriptionData?.subscription_plan?.price / 100 }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="px-6 md:pl-20 md:pr-40 mt-10 md:mt-10">
    <div
      class="flex gap-8 justify-between relative mt-10 shadow-md py-5 pb-10 rounded-lg px-6"
    >
      <p class="text-[#252F48] font-medium">Switch Subscription Status</p>
      <jw-toggle />
    </div>
  </div> -->

  <div class="px-6 md:pl-20 md:pr-40 mt-10 md:mt-10">
    <p class="text-[#021863] text-2xl font-semibold">Job Application Form</p>

    <form
      @submit.prevent="handleApplication"
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
        required
      />

      <jw-input
        label="Date applied"
        type="date"
        class="w-full"
        v-model="form.date_applied"
        required
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
        required
      />

      <select
        name=""
        id=""
        class="px-6 py-3 border border-[#ccc] rounded"
        v-model="form.job_level"
      >
        <option value="">Select Level</option>
        <option value="Entry">Entry Level</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <div>
        <p>Upload Resume Used</p>
        <jw-upload
          class="mt-5"
          @file-selected="handleFileSelected"
          :reset="resetUpload"
          cta="Upload Image"
        />
      </div>

      <editor
        v-model="form.job_description"
        placeholder="Enter Job description"
        editorStyle="height: 320px"
      />

      <div>
        <p>Cover letter</p>
        <editor
          v-model="form.cover_letter"
          placeholder="Enter cover letter"
          editorStyle="height: 320px"
        />
      </div>

      <div class="flex justify-end">
        <button class="bg-[#5270ED] text-[#fff] py-3 px-4 rounded text-xs">
          <jw-spinner v-if="loading" />
          <span v-else> Apply for Subscriber</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import JwInput from './components/JwInput.vue';
import JwToggle from '@/components/JwToggle.vue';
import { onMounted, ref } from 'vue';
import { JobApplicationService, SubscriptionService } from '@/services';
import { useRoute } from 'vue-router';
import Editor from 'primevue/editor';
import { useToast } from 'vue-toastification';
import JwSpinner from '@/components/JwSpinner.vue';
import JwUpload from '@/components/JwUpload.vue';
import axios from 'axios';

const form = ref({
  job_profile_id: '',
  company_name: '',
  job_title: '',
  job_level: '',
  job_link: '',
  date_applied: '',
  salary_range: '',
  job_description: '',
});

const subscriptionData = ref({});
const toast = useToast();
const loading = ref(false);
const file_key = ref(null);
const selectedFile = ref(null);
const resetUpload = ref(false);

const route = useRoute();
console.log(route);
const fetchASubscription = async () => {
  const data = await SubscriptionService.fetchASubscription(route.params.id);
  subscriptionData.value = data.payload;

  form.value.job_profile_id = data.payload.job_profile.job_profile_id;
  console.log(data);
};

const handleApplication = async () => {
  loading.value = true;
  if (selectedFile.value) {
    const formData = new FormData();
    const token = localStorage.getItem('access_token');
    formData.append('file', selectedFile.value);

    let requestObj = {
      url: `https://the-jobwise-backend.onrender.com/api/v1/file-upload`,
      method: 'POST',
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios(requestObj);
    file_key.value = response.data.payload.file_key;
    const payload = { ...form.value, resume_used: file_key.value };
    try {
      const data = await JobApplicationService.createApplication(payload);

      form.value = {
        job_profile_id: '',
        company_name: '',
        job_title: '',
        job_level: '',
        job_link: '',
        date_applied: '',
        salary_range: '',
        job_description: '',
      };

      toast.success(data.message);

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }

    console.log(payload);
  }
};

const handleFileSelected = (file) => {
  selectedFile.value = file;
  resetUpload.value = false;
  console.log(selectedFile.value);
};

onMounted(() => {
  fetchASubscription();
});
</script>

<style lang="scss" scoped></style>
