<template>
  <page-heading title="Job Profiles" />

  <div
    class="px-6 flex flex-col gap-[39px] md:px-20 md:pr-[200px] mt-[42px] md:mt-[92px]"
  >
    <div class="flex gap-4">
      <p class="text-2xl text-primary-100 font-semibold">
        Create New Job Profile
      </p>
      <img src="/images/svg/caret-right.svg" alt="" />
      <p class="text-sm font-medium text-[#6d7a8d] self-center">Search Info</p>
    </div>

    <div class="flex gap-4">
      <img src="/images/svg/radio-checked.svg" alt="" />
      <hr class="border-0 border-t-2 border-[#D1D5DB] grow self-center" />
      <img src="/images/svg/radio-unchecked.svg" alt="" />
    </div>
  </div>
  <div class="px-6 md:px-20 md:pr-[200px] mt-4">
    <p class="text-[#6d7a8d] font-medium">
      Complete your desired job info and location
    </p>
  </div>

  <form
    class="md:px-20 md:pr-[200px] mt-4"
    @submit.prevent="handleSubmitProfile"
  >
    <div class="p-6 rounded-lg md:bg-[#fff] md:shadow-sm">
      <div class="mb-8">
        <jw-input
          label="Job Title"
          placeholder="UI Designer"
          type="text"
          id=""
          v-model="form.job_title"
          @blur="v$.job_title.$touch()"
        />
        <p class="text-xs text-[#6d7a8d] mt-1">
          This job title will be used to search for jobs around the web
        </p>
        <div v-if="v$.job_title.$dirty && v$.job_title.$error" class="mt-1">
          <div v-if="v$.job_title.required.$invalid">
            <p class="text-error-500 text-xs">Job title is required</p>
          </div>
        </div>
      </div>
      <div class="mb-8">
        <ComboBoxSelect
          :options="options"
          @options-selected="handleOptionsSelected"
          @input-change="handleSelectChange"
          label="Job Type"
          v-model="selectedJobType"
        />

        <MultiSelectDropdown
          :options="[]"
          label="Select Options"
          placeholder="Choose..."
          @options-selected="handleOptionsSelected"
        />
        <div v-if="v$.job_type.$dirty && v$.job_type.$error" class="mt-1">
          <div v-if="v$.job_type.required.$invalid">
            <p class="text-error-500 text-xs">Job type is required</p>
          </div>
        </div>
      </div>
      <div class="mb-8">
        <ComboBoxInput
          :options="optionsTest"
          @option-selected="handleOptionSelected"
          @input-change="handleInputChange"
          label="Job boards"
          @add-option="handleAddOption"
          @blur="v$.job_board.$touch()"
        />
        <div class="flex mt-2 gap-2">
          <div
            class="rounded bg-secondary-100 text-white py-0.5 px-3 flex gap-2"
            v-for="(option, i) in selectedOption"
            :key="`option-${i}`"
          >
            <p v-if="selectedOption" class="text-sm self-center">
              {{ option }}
            </p>
            <p
              class="self-center cursor-pointer text-[18px]"
              @click="handleRemoveOption(i)"
            >
              <i class="bi bi-x"></i>
            </p>
          </div>
        </div>
        <div v-if="v$.job_board.$dirty && v$.job_board.$error" class="mt-1">
          <div v-if="v$.job_board.required.$invalid">
            <p class="text-error-500 text-xs">Job board is required</p>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <ComboBoxSelect
          :options="locationOptions"
          @options-selected="handleLocationOptionSelected"
          @input-change="handleSelectChange"
          label="Location Type"
          v-model="selectedLocationType"
        />

        <MultiSelectDropdown
          :options="[]"
          label="Select Options"
          placeholder="Choose..."
          @options-selected="handleLocationOptionSelected"
        />
        <div v-if="v$.job_type.$dirty && v$.job_type.$error" class="mt-1">
          <div v-if="v$.job_type.required.$invalid">
            <p class="text-error-500 text-xs">Job type is required</p>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <jw-input
          label="Country"
          placeholder="United States"
          v-model="form.country"
          @blur="v$.country.$touch()"
        />
        <p class="text-xs text-[#6d7a8d] mt-1">Type a country</p>

        <div v-if="v$.country.$dirty && v$.country.$error" class="mt-1">
          <div v-if="v$.country.required.$invalid">
            <p class="text-error-500 text-xs">Country is required</p>
          </div>
        </div>
      </div>

      <!-- <div class="flex gap-2 mb-8">
        <input
          type="checkbox"
          name=""
          id="check"
          class="w-5 h-5 block"
          v-model="form.is_remote_only"
        />
        <label
          for="check"
          class="cursor-pointer self-center text-[#252f48] font-medium"
          >Search only for remote jobs</label
        >
      </div> -->

      <div class="mb-8">
        <jw-select-cv
          :options="cvOptions"
          placeholder="Select suitable CV"
          label="Select CV"
          v-model="form.resume_id"
          @blur="v$.resume_id.$touch()"
        />
        <div v-if="v$.resume_id.$dirty && v$.resume_id.$error" class="mt-1">
          <div v-if="v$.resume_id.required.$invalid">
            <p class="text-error-500 text-xs">Please select/upload a CV</p>
          </div>
        </div>

        <!-- <button
          class="mt-3 py-4 px-8 gap-2.5 flex bg-primary-100 rounded text-[#fff]"
        > -->
        <div
          class="mt-3 text-secondary-100 flex gap-2 cursor-pointer"
          @click="showCVModal = true"
        >
          <i class="bi bi-plus-circle-fill"></i>
          <span class="text-sm self-center">Add a CV</span>
        </div>
        <!-- </button> -->
      </div>

      <div class="mb-8">
        <jw-select
          :options="levelOptions"
          placeholder="Select experience level"
          label="Experience level"
          v-model="form.experience_level"
          @blur="v$.experience_level.$touch()"
        />
        <div
          v-if="v$.experience_level.$dirty && v$.experience_level.$error"
          class="mt-1"
        >
          <div v-if="v$.experience_level.required.$invalid">
            <p class="text-error-500 text-xs">Experience level is required</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-6 mb-8">
        <div class="basis-1/2">
          <jw-input
            label="Email"
            placeholder="example@email.com"
            v-model="form.email"
          />
          <p class="text-xs text-red-500 mt-1">
            Advisable to use a new email address, a variation of your first name
            and last name, and a few numbers is advisable
          </p>

          <!-- <div v-if="v$.email.$dirty && v$.email.$error" class="mt-1">
            <div v-if="v$.email.required.$invalid">
              <p class="text-error-500 text-xs">Email is required</p>
            </div>
            <div v-else-if="v$.email.email.$invalid">
              <p class="text-error-500 text-xs">Enter a valid email address</p>
            </div>
          </div> -->
        </div>

        <div class="basis-1/2">
          <jw-input
            label="Password"
            v-model="form.email_password"
            type="password"
            rightIcon="bi bi-eye"
          />
          <p class="text-xs text-secondary-100 mt-1">
            The password to the email is needed to be able to apply for jobs
          </p>

          <!-- <div
            v-if="v$.email_password.$dirty && v$.email_password.$error"
            class="mt-1"
          >
            <div v-if="v$.email_password.required.$invalid">
              <p class="text-error-500 text-xs">Password is required</p>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </form>

  <div class="px-6 flex gap-10 justify-end md:px-20 md:pr-[200px] mt-10">
    <button
      class="flex justify-end gap-2.5 bg-[#f4f4f4] py-4 px-8 rounded"
      @click="$router.back()"
    >
      <img src="/images/svg/arrow-left-black.svg" alt="" />
      <p class="font-semibold text-[#252f48]">Back</p>
    </button>

    <button
      class="flex justify-end gap-2.5 bg-primary-100 py-4 px-8 rounded"
      @click="handleSubmitProfile"
    >
      <jw-spinner v-if="loading" />

      <p class="font-semibold text-[#fff]">Save and Continue</p>
      <!-- <img src="@/assets/images/svg/arrow-right-white.svg" alt="" /> -->
    </button>
  </div>

  <jw-modal
    @close-modal="showCVModal = false"
    :setup="{
      modalActive: showCVModal,
      modalTitle: 'Upload CV',
      isVerification: false,
    }"
  >
    <create
      @uploaded="updatePayload"
      @title-updated="handleTitleUpdated"
      :key="formKey"
    />

    <div class="flex justify-between gap-4 mt-6">
      <button
        class="py-4 px-8 bg-[#c3ccd2] grow rounded text-[#252f48]"
        @click="showCVModal = false"
      >
        Cancel
      </button>
      <button
        class="py-4 px-8 grow bg-primary-100 rounded text-[#fff]"
        @click="handleSubmit"
      >
        <jw-spinner v-if="loading" />
        <span v-else>Upload CV</span>
      </button>
    </div>
  </jw-modal>
</template>

<script setup>
import JwInput from './components/JwInput.vue';
import JwSelectCv from '@/components/JwSelectCv.vue';
import JwSelect from '@/components/JwSelect.vue';
import PageHeading from '@/components/PageHeading.vue';
import { onMounted, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import {
  JobProfileService,
  //   ResumeService,
  SettingService,
  UserService,
} from '@/services';
import { useRoute, useRouter } from 'vue-router';
import JwModal from '@/components/JwModal.vue';
import JwSpinner from '@/components/JwSpinner.vue';
import Create from './components/create.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import ComboBoxInput from '@/components/ComboBoxInput.vue';
import ComboBoxSelect from '@/components/ComboBoxSelect.vue';
import { useUserStore } from '@/stores/users';
import { ResumeService } from '@/services';

const toast = useToast();
const route = useRoute();

const showCVModal = ref(false);
const form = ref({
  subscription_id: '',
  resume_id: '',
  job_title: '',
  job_type: [],
  job_board: [],
  country: '',
  preferred_industries: ['Oil and Gas'],
  is_remote_only: false,
  email: '',
  email_password: '',
  user_id: route.params.id,
});

const userStore = useUserStore();
const selectedOption = ref([]);
const selectedJobType = ref([]);
const selectedLocationType = ref([]);
const customInput = ref('');
const loading = ref(false);

const emits = ['uploaded'];

const router = useRouter();

const optionsTest = ref([
  'Indeed',
  'Glassdoor',
  'Zip Recruiter',
  'LinkedIn',
  'Dice',
  'Jooble',
  'Others',
]);

const rules = {
  // email: { required, email },
  // email_password: { required },
  // subscription_id: { required },
  resume_id: { required },
  job_title: { required },
  job_type: { required },
  job_board: { required },
  country: { required },
  preferred_industries: { required },
  is_remote_only: { required },
  experience_level: { required },
};

// Initialize Vuelidate
const v$ = useVuelidate(rules, form);

// Handle option selection
const handleOptionSelected = (option) => {
  if (selectedOption.value.includes(option)) {
    return;
  }

  selectedOption.value.push(option);
  // if (
  //   userStore.user.subscription.subscription_plan.tier === 1 &&
  //   selectedOption.value.length > 1
  // ) {
  //   selectedOption.value.pop();
  //   toast.error('Your current plan only allows for 1 job board.');
  //   return;
  // }

  // if (
  //   userStore.user.subscription.subscription_plan.tier === 2 &&
  //   selectedOption.value.length > 2
  // ) {
  //   selectedOption.value.pop();
  //   toast.error('Your current plan only allows for 2 job boards.');
  //   return;
  // }

  // if (
  //   userStore.user.subscription.subscription_plan.tier === 3 &&
  //   selectedOption.value.length > 3
  // ) {
  //   selectedOption.value.pop();
  //   toast.error('The maximum job boards available is 3');
  //   return;
  // }

  form.value = { ...form.value, job_board: selectedOption.value };

  console.log(userStore.user.subscription);

  customInput.value = ''; // Clear custom input when an option is selected
};

const handleOptionsSelected = (selectedOptions) => {
  selectedJobType.value = selectedOptions;

  form.value.job_type = selectedOptions;
  console.log('Selected Options:', selectedOptions);
};

const handleLocationOptionSelected = (selectedOptions) => {
  selectedLocationType.value = selectedOptions;
  form.value.location_type = selectedOptions;
};

const handleRemoveOption = (option) => {
  selectedOption.value.splice(option, 1);
};

const handleAddOption = (option) => {
  if (!optionsTest.value.includes(option)) {
    optionsTest.value.push(option); // Add the new option to the list
    form.value = { ...form.value, job_board: selectedOption.value };
  }
};

// Handle custom input changes
const handleInputChange = (value) => {
  customInput.value = value;
  // Clear selected option when typing
};
const customSelect = ref('');

const options = [
  'Contract',

  'Full-time',

  'Part-time',

  'Internship',

  'Temporary',
];

const locationOptions = ['Remote', 'Hybrid', 'On-site'];

const cvOptions = ref([]);

const levelOptions = ref([
  {
    id: 0,
    value: 'Entry Level',
  },
  {
    id: 0,
    value: 'Intermediate',
  },
  {
    id: 0,
    value: 'Expert',
  },
]);

const boardOptions = [
  {
    id: 0,
    value: 'indeed',
  },
  { id: 1, value: 'glassdoor' },
];

const resumes = ref([]);

const fetchResumes = async () => {
  const formattedOptions = cvOptions.value.map((cur, i) => {
    return {
      id: cur.resume_id,
      value: cur.title,
    };
  });
  loading.value = true;
  const data = await ResumeService.fetchResumes(route.params.id);
  cvOptions.value = data.payload.rows.map((cur, i) => {
    return {
      text: cur.title,
      value: cur.resume_id,
    };
  });
  console.log(cvOptions);
  //   console.log(data);
  resumes.value = data.payload.rows;
  loading.value = false;
};

const updatePayload = (e) => {
  cvPayload.value.file = e.file;
};

const handleTitleUpdated = (e) => {
  cvPayload.value.title = e.target.value;
  console.log(e.target.value);
};

const handleSubmitProfile = async () => {
  console.log(form.value);
  const isFormCorrect = await v$.value.$validate();

  // Check if form is invalid
  if (!isFormCorrect) {
    console.log('Validation failed', v$.value.$errors);
    return;
  }
  console.log('profile');
  form.value.job_type = selectedJobType.value;
  form.value.job_board = selectedOption.value;

  try {
    console.log(form.value);
    loading.value = true;

    const data = await JobProfileService.createProfile(form.value);
    toast.success(data.message);
    const profile = await UserService.fetchAUser(route.params.id);

    localStorage.setItem(
      'user-profile-id',
      profile.payload.job_profile.job_profile_id
    );

    // userStore.UPDATE_USER(profile.payload);
    // userStore.UPDATE_JOB_PROFILE_EXIST(false);
    console.log(data);
    localStorage.setItem('form-step-1', JSON.stringify(form.value));

    router.push({ name: 'create-job-profile-2' });
    loading.value = false;
    jobProfileExist.value = true;
  } catch (error) {
    console.log(error);
    // toast.error(error);

    loading.value = false;
  }
};
const cvPayload = ref({
  title: '',
});
const formKey = ref(0);
const file_key = ref('');
const resetUpload = ref(false);
const handleSubmit = async () => {
  loading.value = true;
  if (cvPayload.value.title === '') {
    loading.value = false;
    toast.error('CV name is required');
    return;
  }

  if (cvPayload.value.file) {
    const formData = new FormData();
    const token = localStorage.getItem('access_token');
    formData.append('file', cvPayload.value.file);

    let requestObj = {
      url: `${import.meta.env.VITE_VUE_APP_API_BASE}/file-upload`,
      method: 'POST',
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      loading.value = true;
      const response = await axios(requestObj);
      file_key.value = response.data.payload.file_key;

      const payload = {
        file_key: file_key.value,
        title: cvPayload.value.title,
        user_id: route.params.id,
      };
      try {
        const data = await ResumeService.createResumes(payload);
        console.log(data);
        if (data.status === 409) {
          toast.error(data.response.data.message);
          showCVModal.value = false;
          loading.value = false;
        } else {
          toast.success(data.message);
          resetUpload.value = true;
          selectedFile.value = null;
          // Clear the selected file
          loading.value = false;
          await fetchResumes();
          form.value.resume_id = resumes.value[0].resume_id;

          loading.value = false;
          formKey.value += 1;
          showCVModal.value = false;
        }
      } catch (error) {
        showCVModal.value = false;
        loading.value = false;
      }

      // router.push({ name: 'cv' });
    } catch (error) {
      loading.value = false;
      console.log(error);
      // toast.error(error.response.data.error.file);
      toast.error(error);
      resetUpload.value = true;
      // selectedFile.value = null;
      showCVModal.value = false;
    }
  } else {
    toast.error('No file selected');
    loading.value = false;
  }
};

const jobProfileExist = ref(false);

const fetchJobProfile = async () => {
  const data = await JobProfileService.fetchProfiles({
    user_id: route.params.id,
  });

  console.log(data);
};

onMounted(async () => {
  const profile = await UserService.fetchAUser(route.params.id);
  console.log(profile);
  fetchResumes();
  // fetchSubscriptions();
  fetchJobProfile();
});
</script>

<style scoped></style>
