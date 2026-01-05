<template>
  <page-heading title="Payments" />
  <div class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]">
    <p class="text-2xl font-semibold text-primary-100">Payments</p>
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
    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <jw-spinner />
    </div>

    <!-- Table Content -->
    <div v-else>
      <payment-table :items="paymentData" />
      <jw-pagination
        class="mt-10 font-sm"
        v-if="pagination.total"
        :key="`pagination-${pagination.current_page}`"
        :current-page="pagination.current_page"
        :total-records="pagination.total"
        :per-page="pagination.perPage"
        @onchange="handlePageChange"
      />
    </div>
  </div>

  <!-- Vue Date Picker -->

  <!-- <div class="mt-10 flex justify-center">
    <button class="bg-[#5270ED] rounded-lg text-white py-3 px-4">
      View More
    </button>
  </div> -->
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import PaymentTable from './components/PaymentTable.vue';
import { ref, onMounted } from 'vue';
import { PaymentService } from '@/services';
import JwPagination from '@/components/JwPagination.vue';
import JwSpinner from '@/components/JwSpinner.vue';

// Reactive state for payment data
const paymentData = ref([]);
const loading = ref(false);

// Reactive state for toggling date picker
const showDatePicker = ref(false);
const pagination = ref({
  total: 40,
  current_page: 1,
  perPage: 1,
});

// Function to toggle the date picker
const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value;
};

const fetchPayments = async (page = 1) => {
  loading.value = true;
  try {
    const data = await PaymentService.fetchPayments({ page: page });

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

    console.log(data);
  } catch (error) {
    console.error('Error fetching payments:', error);
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
    fetchPayments(page);
  }
};

onMounted(() => {
  fetchPayments(1);
});

const date = ref('');
</script>

<style lang="scss" scoped></style>
