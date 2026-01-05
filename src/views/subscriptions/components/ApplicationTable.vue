<template>
  <div class="">
    <table class="w-full">
      <thead>
        <tr class="rounded-[16px]">
          <th class="rounded-l-[16px] text-sm text-grey-500">
            Admin in Charge
          </th>
          <th class="text-sm text-grey-500">Job Title</th>
          <th class="text-sm text-grey-500">Company</th>
          <th class="text-sm text-grey-500">Job Level</th>
          <th class="text-sm text-grey-500">Job Type</th>
          <th class="text-sm text-grey-500">Date applied</th>
          <th class="text-sm text-grey-500">Status</th>

          <!-- <th class="text-sm text-grey-500">Action</th> -->
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in props.items" :key="index">
          <td>
            {{ item.admin }}
          </td>
          <td>{{ item.job_title }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.job_level }}</td>
          <td>{{ item.job_type }}</td>
          <td>{{ item.date_applied }}</td>

          <td>
            <status-pill :status="item.status" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import StatusPill from './StatusPill.vue';
import JwSpinner from '@/components/JwSpinner.vue';

export default {
  name: 'PaymentHistoryTable',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: { StatusPill, JwSpinner },
  setup(props, { emit }) {
    const loading = ref(false);
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
      loading,

      props,
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
