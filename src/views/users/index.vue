<template>
  <page-heading title="Users" />
  <div class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]">
    <div class="flex justify-between relative">
      <div
        class="bg-[#F4F4F4] rounded-[32px] self-center w-[425px] p-3 flex items-center gap-2"
      >
        <img src="/images/svg/search.svg" alt="" />
        <input
          v-model="searchQuery"
          type="text"
          class="w-full focus:outline-0 text-[#1C1B1FCC] px-4 border-0 bg-transparent"
          placeholder="Search"
          @keyup.enter="handleSearch"
        />
        <button
          @click="handleSearch"
          class="bg-primary-100 text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
        >
          Search
        </button>
        <!-- <img
          src="/images/svg/filter.svg"
          alt="Filter"
          class="cursor-pointer"
          @click="toggleDatePicker"
        /> -->
      </div>

      <div
        class="flex gap-2 self-center cursor-pointer"
        @click="handleExportUsers"
      >
        <img src="/images/svg/export.svg" class="" alt="" />
        <span class="text-primary-100"> Export </span>
      </div>
    </div>
  </div>
  <div v-if="showDatePicker" class="absolute right-0 top-10">
    <vue-date-picker v-model="date" />
  </div>

  <div class="mt-10 px-6 md:pl-20 md:pr-40">
    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <jw-spinner />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!loading && paymentData.length === 0"
      class="flex flex-col items-center justify-center py-20"
    >
      <div class="text-center">
        <svg
          class="mx-auto h-24 w-24 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No users found</h3>
        <p class="mt-2 text-sm text-gray-500">
          {{
            searchQuery
              ? `No results found for "${searchQuery}". Try adjusting your search.`
              : 'No users available at the moment.'
          }}
        </p>
        <div class="mt-6" v-if="searchQuery">
          <button
            @click="clearSearch"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-100 hover:opacity-90 focus:outline-none transition-opacity"
          >
            Clear Search
          </button>
        </div>
      </div>
    </div>

    <!-- Table Content -->
    <div v-else>
      <payment-table
        :items="paymentData"
        @view-sub-details="handleViewSubscriptionDetails"
        @view-applications="handleViewApplications"
        @export-user="handleExportUser"
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
import PaymentTable from './components/SubscriptionTable.vue';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { SubscriptionService, UserService } from '@/services';
import JwPagination from '@/components/JwPagination.vue';
import JwSpinner from '@/components/JwSpinner.vue';

// Reactive state for payment data

const router = useRouter();
const paymentData = ref([
  // Add more data as required
]);

// Reactive state for toggling date picker
const showDatePicker = ref(false);
const loading = ref(false);

const pagination = ref({
  total: 0,
  current_page: 1,
  perPage: 10,
});

// Function to toggle the date picker
const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value;
};

const date = ref('');
const searchQuery = ref('');
let currentRequest = null; // Track current request

const handleViewSubscriptionDetails = (e) => {
  router.push(`/subscriptions/${e.id}/details`);
};
const handleViewApplications = (e) => {
  router.push(`/subscriptions/${e.id}/applications`);
};

const fetchUsers = async (page = 1) => {
  // Prevent concurrent requests but allow sequential ones
  if (loading.value) {
    return;
  }

  const params = { page };

  // Add search query if it exists
  if (searchQuery.value.trim()) {
    params.search = searchQuery.value.trim();
  }

  // Create request signature
  const requestSignature = JSON.stringify(params);

  // Don't make the same request twice in a row
  if (currentRequest === requestSignature) {
    return;
  }

  try {
    loading.value = true;
    currentRequest = requestSignature;

    const data = await UserService.fetchUsers(params);
    console.log('Full API response:', data);
    console.log('API payload:', data?.payload);
    console.log('API paging:', data?.payload?.paging);
    console.log(
      'API paging keys:',
      data?.payload?.paging
        ? Object.keys(data.payload.paging)
        : 'No paging object'
    );

    paymentData.value = data?.payload?.rows || [];

    // Check if paging exists and has the expected structure
    if (data?.payload?.paging) {
      console.log('Paging object exists, setting pagination.value');
      const pagingData = data.payload.paging;

      // Calculate current page from the page parameter
      const currentPage = params.page || 1;

      // Create pagination object with the correct structure
      pagination.value = {
        total: pagingData.total || 0,
        current_page: currentPage,
        perPage: pagingData.perPage || 20,
        totalNoPages: pagingData.totalNoPages || 1,
        currentPageTotal: pagingData.currentPageTotal || 0,
      };

      console.log('Calculated pagination:', pagination.value);
    } else {
      console.log('No paging object, using default');
      pagination.value = {
        total: 0,
        current_page: 1,
        perPage: 10,
      };
    }

    // Debug logging
    console.log('Pagination data received:', pagination.value);
    console.log('Current page from API:', data?.payload?.paging?.current_page);
    console.log('Pagination object keys:', Object.keys(pagination.value));

    // console.log(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    paymentData.value = [];
    pagination.value = {
      total: 0,
      current_page: 1,
      perPage: 10,
    };
  } finally {
    loading.value = false;
    // Clear request after a short delay to allow new legitimate requests
    setTimeout(() => {
      currentRequest = null;
    }, 300);
  }
};

const handlePageChange = (page) => {
  console.log('handlePageChange called with page:', page);
  console.log('Full pagination object:', pagination.value);
  console.log('Pagination keys:', Object.keys(pagination.value));
  console.log(
    'Current pagination.current_page:',
    pagination.value.current_page
  );
  // Only fetch if the page is different from current page
  if (page !== pagination.value.current_page) {
    console.log('Page is different, fetching users...');
    fetchUsers(page);
  } else {
    console.log('Page is the same, not fetching');
  }
};

const handleSearch = () => {
  // Reset current request and fetch page 1
  currentRequest = null;
  fetchUsers(1);
};

const clearSearch = () => {
  // Just clear the search query - the watch will handle fetching
  searchQuery.value = '';
};

function downloadCSV(csvData, filename = 'data.csv') {
  // Create a Blob with the CSV data
  const blob = new Blob([csvData], { type: 'text/csv' });

  // Create a download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Trigger the download
  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

const handleExportUsers = async () => {
  const data = await UserService.exportUsers();

  downloadCSV(data, 'users.csv');

  console.log(data);
};

// Watch for when search query is cleared
watch(searchQuery, (newValue, oldValue) => {
  // Only trigger if the field was cleared (had value before, now empty)
  if (oldValue && oldValue.trim() && !newValue.trim()) {
    currentRequest = null;
    fetchUsers(1);
  }
});

onMounted(() => {
  fetchUsers(1);
});
</script>

<style lang="scss" scoped></style>
