<template>
  <page-heading title="Applications" />
  <div class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]">
    <p class="cursor-pointer" @click="$router.back()">&larr; Go back</p>
    <p class="text-2xl font-semibold text-primary-100">Job Applications</p>
    <!-- <div class="flex justify-between relative">
      <p class="text-primary-100 mt-4 mb-2.5">October 28, 2024</p>
      <div class="bg-[#F4F4F4] rounded-[32px] w-[425px] p-3 flex items-center">
        <img src="@/assets/images/svg/search.svg" alt="" />
        <input
          type="text"
          class="w-full focus:outline-0 text-[#1C1B1FCC] px-4 border-0 bg-transparent"
          placeholder="Search"
        />
        <img
          src="@/assets/images/svg/filter.svg"
          alt="Filter"
          class="cursor-pointer"
          @click="toggleDatePicker"
        />
      </div>
      <div v-if="showDatePicker" class="absolute right-0 top-10">
        <vue-date-picker v-model="date" />
      </div>
    </div>-->
  </div>

  <div class="mt-10 px-6 md:pl-20 md:pr-40">
    <app-table
      :items="paymentData"
      @view-sub-details="handleViewSubscriptionDetails"
      @view-applications="handleViewApplications"
    />
  </div>

  <!-- Vue Date Picker -->

  <div class="mt-10 flex justify-center">
    <button class="bg-[#5270ED] rounded-lg text-white py-3 px-4">
      View More
    </button>
  </div>
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import AppTable from './components/ApplicationTable.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Reactive state for payment data

const router = useRouter();
const paymentData = ref([
  {
    id: 1,
    admin: 'Donald Dukes',
    job_title: '#39,000.00',
    company: '19/08/2019',
    job_level: 'eboluwatife15@gmail...',
    job_type: 'Fulltime/Remote',
    date_applied: '19/08/2024',
    status: 'in progress',
  },
  {
    id: 1,
    admin: 'Donald Dukes',
    job_title: '#39,000.00',
    company: '19/08/2019',
    job_level: 'eboluwatife15@gmail...',
    job_type: 'Fulltime/Remote',
    date_applied: '19/08/2024',
    status: 'successful',
  },
  {
    id: 1,
    admin: 'Donald Dukes',
    job_title: '#39,000.00',
    company: '19/08/2019',
    job_level: 'eboluwatife15@gmail...',
    job_type: 'Fulltime/Remote',
    date_applied: '19/08/2024',
    status: 'in progress',
  },
  // Add more data as required
]);

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
</script>

<style lang="scss" scoped></style>
