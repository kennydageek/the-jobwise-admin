<template>
  <page-heading title="Applications" />

  <div class="mt-5 flex justify-center" v-show="loading">
    <jw-spinner />
  </div>

  <div class="" v-show="!loading">
    <div v-if="paymentData.length > 0">
      <div
        class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]"
        v-if="paymentData.length > 0"
      >
        <div class="flex justify-between relative">
          <p class="text-primary-100 mt-4 mb-2.5">
            {{ $dayjs(new Date()).format('DD MMMM, YYYY') }}
          </p>
          <div
            class="bg-[#F4F4F4] rounded-[32px] w-[425px] p-3 flex items-center"
          >
            <img src="/images/svg/search.svg" alt="" />
            <input
              type="text"
              class="w-full focus:outline-0 text-[#1C1B1FCC] px-4 border-0 bg-transparent"
              placeholder="Search"
            />
            <img
              src="/images/svg/filter.svg"
              alt="Filter"
              class="cursor-pointer"
              @click="toggleDatePicker"
            />
          </div>
          <div v-if="showDatePicker" class="absolute right-0 top-10">
            <vue-date-picker v-model="date" />
          </div>
        </div>
      </div>

      <div class="mt-10 px-6 md:pl-20 md:pr-40">
        <payment-table
          :items="paymentData"
          @view-application="handleViewApplication"
          @edit-application="handleEditApplication"
          @delete-application="handleDeleteApplication"
        />

        <jw-pagination
          class="mt-10 font-sm"
          v-if="pagination.total"
          :current-page="pagination.current_page"
          :total-records="pagination.total"
          :per-page="pagination.perPage"
          @onchange="fetchApplications"
          :key="paginationKey"
        />
      </div>
    </div>

    <div class="flex justify-center mt-10" v-else>
      <p class="text-xl font-semibold">No data yet!</p>
    </div>
  </div>

  <!-- Vue Date Picker -->

  <jw-modal
    @close-modal="showDeleteModal = false"
    :setup="{
      modalActive: showDeleteModal,
      modalTitle: '',
      isVerification: false,
    }"
  >
    <div class="flex flex-col items-center">
      <div class="text-center">
        <p class="text-2xl md:text-[20px] font-bold text-[#242f48] mb-6">
          Delete Application
        </p>
        <p class="">Are you sure you want to delete this application?</p>
      </div>
    </div>

    <div class="flex justify-between gap-4 mt-6">
      <button
        class="py-4 px-8 bg-[#c3ccd2] grow rounded text-[#252f48]"
        @click="showDeleteModal = false"
      >
        No
      </button>
      <button
        class="py-4 px-8 grow bg-primary-100 rounded text-[#fff]"
        @click="deleteApplication"
      >
        <jw-spinner v-if="deleteLoading" />
        <span v-else>Yes</span>
      </button>
    </div>
  </jw-modal>
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import PaymentTable from './components/AppTable.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { JobApplicationService } from '@/services';
import JwPagination from '@/components/JwPagination.vue';
import JwSpinner from '@/components/JwSpinner.vue';
import JwModal from '@/components/JwModal.vue';
// Reactive state for payment data

const router = useRouter();
const paymentData = ref([
  // Add more data as required
]);
const loading = ref(false);
const pagination = ref({
  total: 40,
  current_page: 1,
  perPage: 1,
});

// Reactive state for toggling date picker
const showDatePicker = ref(false);

// Function to toggle the date picker
const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value;
};

const date = ref('');

const handleViewApplication = (e) => {
  console.log(e);
  router.push(`/application/${e.job_application_id}/details`);
};
const handleEditApplication = (e) => {
  console.log(e);
  router.push(`/application/${e.job_application_id}/edit`);
};

const fetchApplications = async (e) => {
  loading.value = true;
  const data = await JobApplicationService.fetchApplications({ page: e });
  paymentData.value = data.payload.rows;
  pagination.value = data.payload.paging;
  loading.value = false;
};

const selectedApplication = ref({});
const paginationKey = ref(0);
const deleteLoading = ref(false);
const showDeleteModal = ref(false);
const handleDeleteApplication = async (e) => {
  showDeleteModal.value = ref(true);
  selectedApplication.value = e;
  console.log(e);
};

const deleteApplication = async () => {
  console.log('kdkd');
  deleteLoading.value = true;
  const data = await JobApplicationService.deleteJobApplication(
    selectedApplication.value.job_application_id
  );
  deleteLoading.value = false;
  showDeleteModal.value = false;

  await fetchApplications();
  // window.reload();
};

onMounted(() => {
  fetchApplications();
});
</script>

<style lang="scss" scoped></style>
