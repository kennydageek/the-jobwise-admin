<template>
  <page-heading title="Subscriptions" />
  <div class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]">
    <!-- <p class="text-2xl font-semibold text-primary-100">Payments</p> -->
    <div class="flex justify-between relative">
      <p class="text-primary-100 mt-4 mb-2.5">October 28, 2024</p>
      <div class="bg-[#F4F4F4] rounded-[32px] w-[425px] p-3 flex items-center">
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
      @view-sub-details="handleViewSubscriptionDetails"
      @view-applications="handleViewApplications"
    />

    <jw-pagination
      class="mt-10 font-sm"
      v-if="pagination.total"
      :key="`pagination-${pagination.current_page}`"
      :current-page="pagination.current_page"
      :total-records="pagination.total"
      :per-page="pagination.perPage"
      @onchange="handlePageChange"
    />

    <div class="flex justify-center mt-10" v-if="loading">
      <jw-spinner />
    </div>
  </div>

  <!-- Vue Date Picker -->

  <!-- <div class="mt-10 flex justify-center"> -->
  <!-- <button class="bg-[#5270ED] rounded-lg text-white py-3 px-4">
      View More
    </button> -->
  <!-- </div> -->
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import PaymentTable from './components/SubscriptionTable.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { SubscriptionService } from '@/services';
import JwSpinner from '@/components/JwSpinner.vue';
import JwPagination from '@/components/JwPagination.vue';

// Reactive state for payment data

const router = useRouter();
const paymentData = ref([
  // Add more data as required
]);

const pagination = ref({
  total: 40,
  current_page: 1,
  perPage: 1,
});

const loading = ref(false);

// Reactive state for toggling date picker
const showDatePicker = ref(false);

// Function to toggle the date picker
const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value;
};

const date = ref('');

const handleViewSubscriptionDetails = (e) => {
  router.push(`/subscriptions/${e.id}/details`);
};
const handleViewApplications = (e) => {
  router.push(`/subscriptions/${e.id}/applications`);
};

const fetchSubscriptions = async (page = 1) => {
  loading.value = true;
  try {
    const data = await SubscriptionService.fetchSubscriptions({
      page: page,
    });
    paymentData.value = data?.payload?.rows || [];

    // Handle pagination structure similar to users page
    if (data?.payload?.paging) {
      const pagingData = data.payload.paging;
      pagination.value = {
        total: pagingData.total || 0,
        current_page: page,
        perPage: pagingData.perPage || 20,
        totalNoPages: pagingData.totalNoPages || 1,
        currentPageTotal: pagingData.currentPageTotal || 0,
      };
    } else {
      pagination.value = {
        total: 0,
        current_page: 1,
        perPage: 20,
      };
    }

    console.log(pagination.value);
    console.log(data);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    paymentData.value = [];
    pagination.value = {
      total: 0,
      current_page: 1,
      perPage: 20,
    };
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page) => {
  // Only fetch if the page is different from current page
  if (page !== pagination.value.current_page) {
    fetchSubscriptions(page);
  }
};

onMounted(() => {
  fetchSubscriptions(1);
});
</script>

<style lang="scss" scoped></style>
