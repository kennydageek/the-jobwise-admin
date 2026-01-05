<template>
  <page-heading title="Dashboard" />
  <div class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]">
    <p class="text-2xl font-semibold text-primary-100">
      Welcome back, {{ userStore.user.last_name }}
    </p>
    <!-- <p class="text-primary-100 mt-4 mb-2.5">October 28, 2024</p> -->
  </div>

  <div class="flex flex-col md:flex-row gap-[79px] mt-[42px]">
    <div
      class="flex flex-col md:gap-x-8 gap-y-4 md:gap-y-2.5 flex-wrap md:flex-row px-6 md:px-20"
    >
      <stat-card
        :items="metric"
        v-for="(metric, i) in metrics"
        :key="`metric-${i}`"
        class="grow"
      />
    </div>
  </div>

  <div class="px-6 md:px-20 mt-[42px]">
    <div class="flex justify-between">
      <p class="text-[#021863] font-semibold text-xl mb-6">Payments</p>
      <div class="flex gap-2">
        <router-link to="/payments" class="text-[#6D7A8D] text-sm self-center"
          >View all</router-link
        >
        <img src="/images/svg/caret-right.svg" class="w-4 self-center" alt="" />
      </div>
    </div>

    <div class="mt-10">
      <payment-table :items="paymentData" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import StatCard from './components/StatCard.vue';
import PageHeading from '@/components/PageHeading.vue';
import { useUserStore } from '@/stores/users.js';
import { DashboardService, PaymentService } from '@/services';
import PaymentTable from './components/PaymentTable.vue';

const route = useRoute();
const userStore = useUserStore();

// Define metrics as a ref to make it reactive
const metrics = ref([]);

const paymentData = ref([]);

const fetchDashboardStats = async () => {
  try {
    const data = await DashboardService.fetchDashboardStats();
    console.log('API Response:', data);

    // Map the API data to the metrics array
    metrics.value = [
      {
        title: 'Registered Users',
        count: data?.payload?.users?.count,
        growth: '0%',
      },
      {
        title: 'Daily applications Count',
        count: data?.payload?.daily_applications?.count,
        growth: '0%',
      },
      {
        title: 'Job profiles created',
        count: data?.payload?.job_profiles?.count,
        growth: '0%',
      },
      {
        title: 'Job applications',
        count: data?.payload?.job_applications?.count,
        growth: '0%',
      },
      {
        title: 'Subscriptions',
        count: data?.payload?.subscriptions?.count,
        growth: '0%',
      },
      {
        title: 'Premium customers',
        count: data?.payload?.subscriptions?.count || 0,
        growth: '0%',
      },
    ];
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
  }
};

const fetchPayments = async () => {
  const data = await PaymentService.fetchPayments({ per_page: 5 });

  paymentData.value = data?.payload?.rows;
  console.log(data);
};
onMounted(() => {
  fetchDashboardStats();
  fetchPayments();
});
</script>

<style scoped>
.card {
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
}
</style>
