<template>
  <div class="mt-5">
    <table class="w-full">
      <thead>
        <tr class="rounded-[16px]">
          <th class="rounded-l-[16px] text-sm text-grey-500">
            <!-- Header checkbox -->
            <input
              type="checkbox"
              v-model="selectAll"
              @change="toggleSelectAll"
            />
          </th>
          <!-- <th class="text-sm text-grey-500">Image</th> -->
          <th class="text-sm text-grey-500">Name</th>
          <th class="text-sm text-grey-500">Email</th>
          <th class="text-sm text-grey-500">Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in itemsWithCheckbox" :key="index">
          <td>
            <!-- Row checkbox -->
            <input
              type="checkbox"
              v-model="item.checked"
              @change="updateRecipients(item)"
            />
          </td>
          <!-- <td>
            <img :src="item.avatar" alt="" />
          </td> -->
          <td>{{ item.first_name }} {{ item.last_name }}</td>
          <td>{{ item.email }}</td>
          <td>
            <status-pill :status="item.status" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
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
    // Add a `checked` property to each item in props.items
    const itemsWithCheckbox = ref(
      props.items.map((item) => ({ ...item, checked: false }))
    );

    // State for the "Select All" checkbox
    const selectAll = ref(false);

    // Array to store IDs of selected recipients
    const recipients = ref([]);

    // Function to toggle the "Select All" checkbox
    const toggleSelectAll = () => {
      itemsWithCheckbox.value.forEach((item) => {
        item.checked = selectAll.value;
      });

      // Update the recipients array
      if (selectAll.value) {
        recipients.value = itemsWithCheckbox.value.map((item) => {
          return item.user_id;
        });
      } else {
        recipients.value = [];
      }

      emit('update-recipients', recipients.value);
    };

    // Function to update the recipients array when a row checkbox is toggled
    const updateRecipients = (item) => {
      if (item.checked) {
        recipients.value.push(item.user_id);
      } else {
        recipients.value = recipients.value.filter((id) => id !== item.user_id);
      }

      // Update the "Select All" checkbox state
      selectAll.value = itemsWithCheckbox.value.every((item) => item.checked);

      emit('update-recipients', recipients.value);
    };

    // Watch for changes in props.items and update itemsWithCheckbox
    watch(
      () => props.items,
      (newItems) => {
        itemsWithCheckbox.value = newItems.map((item) => ({
          ...item,
          checked: false,
        }));
      },
      { deep: true }
    );

    return {
      itemsWithCheckbox,
      selectAll,
      recipients,
      toggleSelectAll,
      updateRecipients,
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
