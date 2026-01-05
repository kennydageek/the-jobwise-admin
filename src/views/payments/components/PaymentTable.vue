<template>
  <div class="">
    <table class="w-full">
      <thead>
        <tr class="rounded-[16px]">
          <th class="rounded-l-[16px] text-sm text-grey-500">S/N</th>
          <th class="text-sm text-grey-500">Name</th>
          <th class="text-sm text-grey-500">Reference</th>

          <th class="text-sm text-grey-500">Amount</th>
          <th class="text-sm text-grey-500">Date</th>
          <th class="text-sm text-grey-500">Status</th>
          <!-- <th class="text-sm text-grey-500">Action</th> -->
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in props.items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <router-link :to="`users/${item.user_id}`">
              {{ item?.user?.first_name }} {{ item?.user?.last_name }}
            </router-link>
          </td>
          <td class="underline">
            <router-link :to="`payments/${item.id}/details`">
              {{ item.reference }}
            </router-link>
          </td>
          <td>{{ formatAsMoney(item.amount / 100) }}</td>
          <td>{{ $dayjs(item.created_at).format('MMM DD, YYYY') }}</td>
          <td>
            <status-pill :status="item.status" />
          </td>
          <!-- <td class="">
            <img src="/images/svg/action-btn.svg" class="w-5 mx-auto" />
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import StatusPill from './StatusPill.vue';
import { formatAsMoney } from '@/utils/formatAsMoney';

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
      formatAsMoney,
    };
  },
};
</script>

<style scoped>
th,
td {
  padding: 12px;
  text-align: center;
}

td {
  padding: 0 16px 0 16px;
  height: 72px;
  font-size: 14px;
  color: #344054;
}

th {
  background-color: #f9fafa;
  padding: 16px 8px;
  font-size: 14px;
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
