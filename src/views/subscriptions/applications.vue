<template>
  <page-heading title="Subscriptions" />
  <div class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]">
    <p class="cursor-pointer" @click="$router.back()">&larr; Go back</p>
    <p class="text-2xl font-semibold text-primary-100">Job Applications</p>
  
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
