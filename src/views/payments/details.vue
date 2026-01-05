<template>
  <page-heading title="Payments" />
  <div class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]">
    <p class="text-2xl font-semibold text-primary-100">Payments</p>
    <div class="flex flex-col md:flex-row justify-between relative">
      <p class="text-primary-100 mt-4 mb-2.5">Paid on October 28, 2024</p>
      <div class="flex gap-4">
        <button
          class="rounded-lg py-2.5 px-6 border border-[#C3CCD2] flex gap-3 text-sm text-[#6D7A8D] font-semibold w-[155px]"
        >
          <p class="self-center">Download</p>
          <img src="/images/svg/download.svg" class="w-6 h-6" alt="" />
        </button>
        <button
          class="rounded-lg py-2.5 px-6 border border-[#C3CCD2] bg-[#09C028] text-sm text-[#fff] font-semibold w-[132px]"
        >
          Paid
        </button>
      </div>
    </div>
  </div>
  <div class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]">
    <div
      class="p-8 border border-[#F0F1F3] shadow-sm shadow-[#1A1C210D] rounded-lg flex justify-between"
    >
      <div class="">
        <p class="text-sm text-[#333843] font-semibold">Emmanuel Adegbola</p>
        <p class="text-[#667085] text-xs mt-3">October 28, 2024 | 3:00pm</p>
        <p class="text-[#667085] text-xs mt-[6px]">
          8102423238 | eboluwatife15@gmail
        </p>
      </div>
      <div class="">
        <div class="bg-[#F4F5F6] py-2 px-3 rounded-lg w-[81px]">
          <p class="text-[#333843] text-xs font-semibold">#py_1234</p>
        </div>
        <div class="mt-2">
          <p class="text-xs text-[#667085] font-medium">Total Amount</p>
          <p class="text-xl text-[#333843] font-bold mt-2">$330.00</p>
        </div>
      </div>
    </div>
  </div>

  <div class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]">
    <div
      class="p-8 border border-[#F0F1F3] shadow-sm shadow-[#1A1C210D] rounded-lg w-full"
    >
      <receipt-table :items="receiptData" />

      <div class="mt-5 flex flex-col gap-3 justify-end items-end">
        <div class="w-full md:w-[250px] flex">
          <div class="text-xs flex justify-between w-full">
            <p class="text-[#6D7A8D]">Total HT</p>
            <p class="text-[#252F48] font-semibold">$3,000</p>
          </div>
        </div>
        <div class="w-full md:w-[250px] flex">
          <div class="text-xs flex justify-between w-full">
            <p class="text-[#6D7A8D]">Total Disbursements</p>
            <p class="text-[#252F48] font-semibold">$30</p>
          </div>
        </div>

        <div class="w-full md:w-[250px] flex">
          <div class="text-xs flex justify-between w-full">
            <p class="text-[#6D7A8D]">Total VAT</p>
            <p class="text-[#252F48] font-semibold">$0</p>
          </div>
        </div>
        <hr class="border-t border-[#C3CCD2] w-full md:w-[250px]" />
        <div class="w-full md:w-[250px] flex">
          <div class="text-xs flex justify-between w-full">
            <p class="text-[#252F48] font-bold">Total Price</p>
            <p class="text-[#252F48] font-semibold">$3,030.00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import ReceiptTable from './components/ReceiptTable.vue';
import { onMounted, ref } from 'vue';
import { PaymentService } from '@/services';
import { useRoute } from 'vue-router';

const receiptData = ref([
  {
    title: 'Subscription',
    title_type: 'Tier 3 Subscription',
    quantity: 150,
    unit_price: '$20',
    vat: '0%',
    amount: '$3,000',
    final_amount: '$3,000',
  },
]);

const route = useRoute();

const fetchAPayment = async () => {
  await PaymentService.fetchAPayment(route.params.id);
};

onMounted(() => {
  fetchAPayment();
});
</script>

<style lang="scss" scoped></style>
