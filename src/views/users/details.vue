<template>
  <page-heading title="User Details" />
  <div
    class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px] flex justify-between"
  >
    <p @click="$router.back()" class="cursor-pointer mb-3">&larr; Back</p>

    <button
      class="bg-secondary-100 text-[#fff] text-sm rounded py-2.5 px-6 border border-[#C3CCD2] font-semibold"
      @click="$router.push(`/application/${route.params.id}/create`)"
    >
      &plus; Create Application
    </button>
  </div>

  <div class="px-6 md:px-20 md:pr-[200px] mt-10">
    <JwTabs :tabs="tabs" v-model:activeTab="activeTab">
      <template v-slot:details>
        <p class="text-2xl font-semibold text-primary-100">
          {{ userTier.tier }}
        </p>
        <div class="flex flex-col md:flex-row justify-between relative">
          <p v-if="userData.subscription" class="text-primary-100 mt-4 mb-2.5">
            Created on {{ userTier.created_at }}
          </p>
          <div class="flex gap-4" v-if="userData.subscription">
            <button
              class="rounded-lg py-2.5 px-6 border border-[#C3CCD2] bg-[#09C028] text-sm text-[#fff] font-semibold w-[132px]"
            >
              Active
            </button>
          </div>
        </div>
        <div class="flex items-end gap-2 mt-10 md:mt-10">
          <div
            class="p-8 border border-[#F0F1F3] shadow-sm shadow-[#1A1C210D] rounded-lg flex justify-between md:w-1/2"
          >
            <div>
              <p class="text-sm text-[#333843] font-semibold">
                {{ userData.first_name }}
                {{ userData.last_name }}
              </p>
              <p class="text-[#667085] text-xs mt-3">
                {{ $dayjs(userData.created_at).format('MMM DD, YYYY') }}
              </p>
              <p class="text-[#667085] text-xs mt-[6px]">
                {{ userData.email }}
              </p>
            </div>
          </div>
          <div>
            <button
              class="bg-[#021863] text-[#fff] text-sm rounded py-2.5 px-6 border border-[#C3CCD2] font-semibold w-full"
              @click="showProfile = true"
              v-if="userData.has_job_profile"
            >
              View Job Profile
            </button>

            <button
              class="bg-[#021863] text-[#fff] text-sm rounded py-2.5 px-6 border border-[#C3CCD2] font-semibold w-full"
              @click="handleRouteToJob"
              v-else
            >
              Create Job Profile
            </button>
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

        <Dialog
          v-model:visible="showProfile"
          header="Job Profile"
          :style="{ width: '50vw' }"
          modal
        >
          <JobProfileView :job-profile="jobProfile" />
        </Dialog>
      </template>
      <template v-slot:applications>
        <applications-list />
      </template>
      <!-- <template v-slot:settings> <settings /> </template> -->
    </JwTabs>
  </div>

  <Dialog
    v-model:visible="showForm"
    header="Application Form"
    :style="{ width: '60vw' }"
    modal
  >
    <application-form />
  </Dialog>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Editor from 'primevue/editor';
import Dialog from 'primevue/dialog';
import JwTabs from '@/components/JwTabs.vue';
import PageHeading from '@/components/PageHeading.vue';
import dayjs from 'dayjs';
import JobProfileView from './components/JobProfile.vue';
import ApplicationsList from './components/ApplicationsList.vue';
import ApplicationForm from './components/EditApplicationForm.vue';

import {
  JobApplicationService,
  UserService,
  FileUploadService,
} from '@/services';
import { Helper } from '@/utils/helpers';

const resetUpload = ref(false);
const selectedFile = ref(null);
const toast = useToast();
const showForm = ref(false);

const route = useRoute();
const router = useRouter();
const showProfile = ref(false);
const fileErrMessage = ref('');
const fileErrMessageRef = ref(null);
const userData = ref({});
const jobProfile = ref({});
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

const handleFileSelected = (file) => {
  selectedFile.value = file;
  resetUpload.value = false;
  fileErrMessage.value = '';
  console.log(selectedFile.value);
};

const activeTab = ref(0);

const tabs = [
  {
    name: 'details',
    title: 'User Details',
  },
  {
    name: 'applications',
    title: 'Applications',
  },
];

async function getUserDetails() {
  const data = await UserService.fetchAUser(route.params.id);
  userData.value = data.payload || {};
  // form.value.user_id = userData.value.user_id;

  if (userData.value.job_profile) {
    const id = userData.value.job_profile?.job_profile_id;
    // form.value.job_profile_id = id;
    const res = await JobApplicationService.fetchJobProfileById(id);
    jobProfile.value = res || {};
  } else {
    toast.error('This user does not have a job profile');
  }
}

const handleRouteToJob = () => {
  router.push(`/users/${route.params.id}/create-job-profile`);
};

onMounted(() => {
  getUserDetails();
});
</script>

<style lang="scss" scoped></style>
