<template>
  <div class="">
    <table class="w-full">
      <thead>
        <tr class="rounded-[16px]">
          <th
            class="rounded-l-[16px] text-sm text-grey-500 w-[301px] text-left"
          >
            ARTICLE
          </th>
          <th class="text-sm text-grey-500 w-[80px]">QUANTITY</th>
          <th class="text-sm text-grey-500 w-[80px]">UNIT PRICE</th>
          <th class="text-sm text-grey-500 w-[48px]">VAT</th>
          <th class="text-sm text-grey-500 w-[80px]">AMOUNT</th>
          <th class="text-sm text-grey-500 w-[80px]">FINAL AMOUNT</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in props.items" :key="index">
          <td class="!text-left">
            <p class="text-xs font-medium text-[#252F48]">{{ item.title }}</p>
            <p class="text-[#6D7A8D] text-xs mt-1">Tier 3 Subscription</p>
          </td>
          <td>
            <p class="text-xs font-medium text-[#252F48]">
              {{ item.quantity }}
            </p>
            <p class="text-[#6D7A8D] text-xs mt-1">Unit(s)</p>
          </td>
          <td>
            <p class="text-xs font-medium text-[#252F48]">
              {{ item.unit_price }}
            </p>
            <p>&nbsp;</p>
          </td>
          <td>
            <p class="text-xs font-medium text-[#252F48]">
              {{ item.vat }}
            </p>
            <p>&nbsp;</p>
          </td>
          <td>
            <p class="text-xs font-medium text-[#252F48]">
              {{ item.amount }}
            </p>
            <p>&nbsp;</p>
          </td>
          <td class="">
            <p class="text-xs font-medium text-[#252F48]">
              {{ item.final_amount }}
            </p>
            <p>&nbsp;</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import StatusPill from './StatusPill.vue';

export default {
  name: 'PaymentHistoryTable',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: { StatusPill },
  setup(props, { emit }) {
    console.log(props);
    const tableArray = ref([
      {
        id: 1,
        showModal: false,
      },
      {
        id: 2,
        showModal: false,
      },
      {
        id: 3,
        showModal: false,
      },
      {
        id: 4,
        showModal: false,
      },
      {
        id: 5,
        showModal: false,
      },
      {
        id: 6,
        showModal: false,
      },
      {
        id: 7,
        showModal: false,
      },
    ]);

    // Function to toggle the modal for a specific row
    const toggleModal = (item) => {
      item.showModal = !item.showModal;
    };

    // Function to close the modal for a specific row
    const closeModal = (item) => {
      item.showModal = false;
    };

    console.log(props);

    return {
      tableArray,
      toggleModal,
      closeModal,

      props,
    };
  },
};
</script>

<style scoped>
th,
td {
  padding: 12px;
}

td {
  padding: 0 16px 0 16px;
  height: 72px;
  font-size: 14px;
  color: #344054;
  text-align: center;
}

th {
  background-color: #f4f4f4;
  padding: 16px 8px;
  font-size: 10px;
  color: #6d7a8d;
  font-weight: 700;
}

tr {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin-top: 16px;
}
</style>
