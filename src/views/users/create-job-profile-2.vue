<template>
  <page-heading title="Job Profiles" />

  <div
    class="px-6 mb-6 flex flex-col gap-[39px] md:px-20 md:pr-[200px] mt-[42px] md:mt-[92px]"
  >
    <div class="flex gap-4">
      <p class="text-2xl text-primary-100 font-semibold">
        Create New Job Profile
      </p>
      <img src="/images/svg/caret-right.svg" alt="" />
      <p class="text-sm font-medium text-[#6d7a8d] self-center">Search Info</p>
    </div>

    <div class="flex gap-4">
      <img src="/images/svg/check.svg" alt="" />
      <hr class="border-0 border-t-2 border-[#D1D5DB] grow self-center" />
      <img src="/images/svg/radio-checked.svg" alt="" />
    </div>
  </div>
  <div class="px-6 mb-6 flex md:px-20 md:pr-[200px] mt-[42px] md:mt-[92px]">
    <p class="font-semibold">Settings</p>
  </div>

  <!-- <div class="md:px-20 md:pr-[200px] mt-4 mb-8">
    <div class="p-6 md:gap-20 rounded-lg md:bg-[#fff] md:shadow-md">
      <div class="flex gap-5 flex-col mb-6 justify-between md:flex-row">
        <div class="text-[#252F48] md:w- components: { JwTelInput },[736px]">
          <p class="font-medium mb-2">Automatically send emails</p>
          <p class="text-sm">
            Enable this to let our platform instantly send emails to matching
            companies, streamlining your job hunt. Prefer reviewing emails
            first? Simply turn this off to personalise messages, ensuring
            alignment with your preferences before dispatch.
          </p>
        </div>
        <div class="md:self-center">
          <jw-toggle @is-checked="updateAutoSend" />
        </div>
      </div>

      <div class="flex gap-5 flex-col mb-6 justify-between md:flex-row">
        <div class="text-[#252F48] md:w-[736px]">
          <p class="font-medium mb-2">Automatically send emails</p>
          <p class="text-sm">
            Enable this to let our platform instantly send emails to matching
            companies, streamlining your job hunt. Prefer reviewing emails
            first? Simply turn this off to personalise messages, ensuring
            alignment with your preferences before dispatch.
          </p>
        </div>
        <div class="md:self-center"><jw-toggle /></div>
      </div>
    </div>
  </div> -->

  <div class="md:px-20 md:pr-[200px]">
    <div class="p-6 md:gap-20 rounded-lg md:bg-[#fff] md:shadow-md">
      <!-- <jw-tel-input
        label="Phone number"
        type="tel"
        id="password"
        leftIcon="bi bi-lock"
        class="mb-8"
      /> -->
      <div class="flex flex-col gap-8 md:flex-row mb-8">
        <div class="basis-1/2">
          <jw-input
            label="State"
            placeholder="Texas"
            v-model="form.state"
            type="text"
            required
            @blur="v$.state.$touch()"
          />
          <!-- <div v-if="v$.state.$dirty && v$.state.$error" class="mt-1">
            <div v-if="v$.state.required.$invalid">
              <p class="text-error-500 text-xs">State is required</p>
            </div>
          </div> -->
        </div>

        <div class="basis-1/2">
          <jw-input
            label="City"
            placeholder="Dallas"
            v-model="form.city"
            type="text"
            required
            @blur="v$.city.$touch()"
          />
          <!-- <div v-if="v$.city.$dirty && v$.city.$error" class="mt-1">
            <div v-if="v$.city.required.$invalid">
              <p class="text-error-500 text-xs">City is required</p>
            </div>
          </div> -->
        </div>
      </div>

      <div class="flex flex-col gap-8 md:flex-row mb-8">
        <div class="basis-1/2">
          <jw-input
            label="Street Address"
            placeholder=""
            v-model="form.address"
            type="text"
            required
          />
          <!-- <div v-if="v$.address.$dirty && v$.address.$error" class="mt-1">
            <div v-if="v$.address.required.$invalid">
              <p class="text-error-500 text-xs">Street Address is required</p>
            </div>
          </div> -->
        </div>
        <div class="basis-1/2">
          <jw-input
            label="Zip code"
            placeholder=""
            v-model="form.postal_code"
            type="text"
            required
          />

          <!-- <div
            v-if="v$.postal_code.$dirty && v$.postal_code.$error"
            class="mt-1"
          >
            <div v-if="v$.postal_code.required.$invalid">
              <p class="text-error-500 text-xs">Postal Code is required</p>
            </div>
          </div> -->
        </div>
      </div>

      <div class="flex flex-col gap-8 md:flex-row mb-8">
        <div class="basis-1/2">
          <jw-input
            label="Annual Rate ($)"
            placeholder=""
            v-model="form.annual_rate"
            type="text"
            class="basis-1/2"
            required
            @blur="v$.annual_rate.$touch()"
          />
          <!-- <div
            v-if="v$.annual_rate.$dirty && v$.annual_rate.$error"
            class="mt-1"
          >
            <div v-if="v$.annual_rate.required.$invalid">
              <p class="text-error-500 text-xs">Annual rate is required</p>
            </div>
          </div> -->
        </div>

        <div class="basis-1/2">
          <jw-input
            label="Hourly Rate ($)"
            placeholder=""
            v-model="form.hourly_rate"
            type="text"
            class="basis-1/2"
            required
            @blur="v$.hourly_rate.$touch()"
          />
          <!-- <div
            v-if="v$.hourly_rate.$dirty && v$.hourly_rate.$error"
            class="mt-1"
          >
            <div v-if="v$.hourly_rate.required.$invalid">
              <p class="text-error-500 text-xs">Hourly rate is required</p>
            </div>
          </div> -->
        </div>
      </div>

      <div class="flex flex-col gap-8 md:flex-row mb-8">
        <div class="basis-1/2">
          <jw-input
            label="Minimum Expected Salary ($)"
            placeholder=""
            v-model="form.lowest_salary_range"
            type="text"
            required
          />

          <!-- <div
            v-if="
              v$.lowest_salary_range.$dirty && v$.lowest_salary_range.$error
            "
            class="mt-1"
          >
            <div v-if="v$.lowest_salary_range.required.$invalid">
              <p class="text-error-500 text-xs">
                Minimum expected salary is required
              </p>
            </div>
          </div> -->
        </div>

        <div class="basis-1/2">
          <jw-input
            label="Lowest Hourly Rate"
            placeholder=""
            v-model="form.lowest_hourly_rate"
            type="text"
            class="basis-1/2"
            required
          />

          <!-- <div
            v-if="v$.lowest_hourly_rate.$dirty && v$.lowest_hourly_rate.$error"
            class="mt-1"
          >
            <div v-if="v$.lowest_hourly_rate.required.$invalid">
              <p class="text-error-500 text-xs">
                Lowest hourly rate is required
              </p>
            </div>
          </div> -->
        </div>
      </div>

      <div class="flex flex-col gap-8 md:flex-row mb-8">
        <div class="basis-1/2">
          <jw-select
            :options="options"
            placeholder="Select Job Type"
            label="Work Authorization"
            v-model="form.work_authorization"
            class="basis-1/2"
            @blur="v$.work_authorization.$touch()"
          />

          <!-- <div
            v-if="v$.work_authorization.$dirty && v$.work_authorization.$error"
            class="mt-1"
          >
            <div v-if="v$.work_authorization.required.$invalid">
              <p class="text-error-500 text-xs">
                Work authorization is required
              </p>
            </div>
          </div> -->
        </div>

        <div class="basis-1/2">
          <jw-input
            label="Years of Experience"
            placeholder=""
            v-model="form.years_of_experience"
            type="text"
            class="basis-1/2"
            required
            @blur="v$.years_of_experience.$touch()"
          />

          <!-- <div
            v-if="
              v$.years_of_experience.$dirty && v$.years_of_experience.$error
            "
            class="mt-1"
          >
            <div v-if="v$.years_of_experience.required.$invalid">
              <p class="text-error-500 text-xs">
                Years of experience is required
              </p>
            </div>
          </div> -->
        </div>
      </div>

      <div class="flex flex-col gap-8 md:flex-row mb-8">
        <div class="basis-1/2">
          <jw-select
            :options="raceOptions"
            placeholder="Select Race"
            label="Race"
            v-model="form.race"
          />
          <!-- <div v-if="v$.race.$dirty && v$.race.$error" class="mt-1">
            <div v-if="v$.race.required.$invalid">
              <p class="text-error-500 text-xs">Race is required</p>
            </div>
          </div> -->
        </div>

        <div class="basis-1/2">
          <jw-input
            label="Social Media URLs"
            placeholder=""
            v-model="form.social_media_urls"
            type="text"
            required
          />

          <!-- <div
            v-if="v$.social_media_urls.$dirty && v$.social_media_urls.$error"
            class="mt-1"
          >
            <div v-if="v$.social_media_urls.required.$invalid">
              <p class="text-error-500 text-xs">
                Social media URLs is required
              </p>
            </div>
          </div> -->
        </div>
      </div>

      <div class="flex flex-col gap-8 md:flex-row mb-8">
        <div class="basis-1/2">
          <jw-select
            :options="securityOptions"
            placeholder="Do you have security clearance"
            label="Security clearance"
            v-model="form.security_clearance"
          />
          <p class="text-xs text-secondary-100 mt-1">If unsure pick "No"</p>
          <!-- <div
            v-if="v$.security_clearance.$dirty && v$.security_clearance.$error"
            class="mt-1"
          >
            <div v-if="v$.security_clearance.required.$invalid">
              <p class="text-error-500 text-xs">
                Security clearance is required
              </p>
            </div>
          </div> -->
        </div>

        <div class="basis-1/2 self-start">
          <jw-input
            label="Preferred Interview Day and Time"
            placeholder="Thursday, 20:00"
            v-model="form.preferred_interview_time"
            type="text"
            class=""
            required
          />
        </div>

        <!-- <div class="basis-1/2 self-start">
          <jw-input
            label="School Name and Graduation Date"
            placeholder=""
            v-model="form.school_name"
            type="text"
            class=""
            required
          /> -->

        <!-- <div
            v-if="v$.school_name.$dirty && v$.school_name.$error"
            class="mt-1"
          >
            <div v-if="v$.school_name.required.$invalid">
              <p class="text-error-500 text-xs">School name is required</p>
            </div>
          </div> -->
        <!-- </div> -->
      </div>

      <div class="flex flex-col gap-8 md:flex-row mb-8">
        <div class="basis-1/2 self-start">
          <jw-input
            label="School Name"
            placeholder=""
            v-model="form.school_name"
            type="text"
            class=""
            required
          />

          <!-- <div
          v-if="
            v$.preferred_interview_time.$dirty &&
            v$.preferred_interview_time.$error
          "
          class="mt-1"
        >
          <div v-if="v$.preferred_interview_time.required.$invalid">
            <p class="text-error-500 text-xs">
              Preferred Interview day is required
            </p>
          </div>
        </div> -->
        </div>

        <div class="basis-1/2 self-start">
          <jw-input
            label="Graduation Date"
            placeholder=""
            v-model="form.graduation_date"
            type="date"
            class=""
            required
          />
        </div>
      </div>

      <!-- <jw-select
        :options="options"
        placeholder="Select Job Type"
        label="Job Type"
        v-model="form.experience_level"
        class="mb-8"
      /> -->

      <!-- <div class="mt-8">
        <p class="text-[#252f48] font-medium">Upload your Cover letter</p>
        <p class="text-xs text-[#6d7a8d]">
          Select the file to use for this Job Profile
        </p>

        <jw-upload class="mt-5" />
      </div> -->
    </div>
  </div>

  <div class="px-6 flex gap-10 justify-end md:px-20 md:pr-[200px] mt-10">
    <button
      class="flex justify-end gap-2.5 bg-[#f4f4f4] py-4 px-8 rounded self-center"
      @click="goBack"
    >
      <img src="/images/svg/arrow-left-black.svg" alt="" />
      <p class="font-semibold text-[#252f48]">Previous</p>
    </button>

    <button
      class="flex justify-end gap-2.5 text-[#fff] bg-primary-100 py-4 px-8 rounded"
      @click="handleSubmit"
    >
      <jw-spinner v-if="loading" />
      <div v-else>Create <span class="hidden md:inline">Job Profile</span></div>
    </button>
  </div>
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import JwToggle from '@/components/JwToggle.vue';
import JwTelInput from '@/components/JwTelInput.vue';
import JwInput from './components/JwInput.vue';
import JwUpload from '@/components/JwUpload.vue';
import JwSelect from '@/components/JwSelect.vue';
import JwSpinner from '@/components/JwSpinner.vue';

import { onMounted, ref } from 'vue';
import { JobProfileService } from '@/services';
import JwSpinnerVue from '@/components/JwSpinner.vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useUserStore } from '@/stores/users';

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const toast = useToast();
const form = ref({
  state: '',
  city: '',
  address: '',
  annual_rate: '',
  hourly_rate: '',
  lowest_salary_range: '',
  lowest_hourly_rate: '',
  work_authorization: '',
  years_of_experience: '',
  race: '',
  social_media_urls: '',
  security_clearance: '',
  school_name: '',
  graduation_date: '',
  postal_code: '',
});

// const rules = {
//   state: { required },
//   city: { required },
//   // address: { required },
//   annual_rate: { required },
//   hourly_rate: { required },
//   // lowest_salary_range: { required },
//   // lowest_hourly_rate: { required },
//   work_authorization: { required },
//   years_of_experience: { required },
//   // race: { required },
//   // social_media_urls: { required },
//   // security_clearance: { required },
//   // school_name: { required },
//   // graduation_date: { required },
//   postal_code: { required },
//   // preferred_interview_time: { required },
// };

// Initialize Vuelidate
// const v$ = useVuelidate(rules, form);

const options = ref([
  {
    id: 0,
    value: 'Citizen',
  },
  {
    id: 1,
    value: 'Green Card',
  },
  {
    id: 2,
    value: 'Work Authorization',
  },
  {
    id: 3,
    value: 'Others',
  },
  {
    id: 4,
    value: 'None',
  },
]);

const securityOptions = ref([
  {
    id: 0,
    value: 'Yes',
  },
  {
    id: 1,
    value: 'No',
  },
]);

const raceOptions = ref([
  {
    id: 0,
    value: 'White',
  },
  {
    id: 1,
    value: 'Black or African American',
  },
  {
    id: 2,
    value: 'American Indian or Alaska',
  },
  {
    id: 3,
    value: 'Asian',
  },

  {
    id: 4,
    value: 'Native Hawaiian or Other Pacific Islander',
  },
  {
    id: 5,
    value: 'Other',
  },
]);

const updateAutoSend = (e) => {
  form.value.auto_send_emails = e;
  console.log(form.value.auto_send_emails);
};

const updateAutoFill = (e) => {
  form.value.auto_fill_applications = e;
};

const goBack = () => {
  router.back();
};

const userStore = useUserStore();
const job_profile_id = ref('');

const handleSubmit = async () => {
  // const isFormCorrect = await v$.value.$validate();

  // Check if form is invalid
  // if (!isFormCorrect) {
  // console.log('Validation failed', v$.value.$errors);
  // return;
  // }

  const savedForm = JSON.parse(localStorage.getItem('form-step-1'));
  const payload = {
    ...savedForm,
    ...form.value,
    job_profile_id: job_profile_id.value,
  };
  console.log(payload);

  try {
    loading.value = true;
    const data = await JobProfileService.editProfile(payload);
    toast.success(data.message);
    console.log(data);
    //   userStore.UPDATE_JOB_PROFILE_EXIST(true);
    router.go(-2);
    localStorage.removeItem('step-1');
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

const fetchJobProfile = async () => {
  const data = await JobProfileService.fetchProfiles({
    user_id: route.params.id,
  });

  job_profile_id.value = localStorage.getItem('user-profile-id');
};

onMounted(() => {
  fetchJobProfile();
});
</script>

<style lang="scss" scoped></style>
