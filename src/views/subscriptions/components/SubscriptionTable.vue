<template>
  <div class="">
    <table class="w-full">
      <thead>
        <tr class="rounded-[16px]">
          <th class="rounded-l-[16px] text-sm text-grey-500">Name</th>
          <th class="rounded-l-[16px] text-sm text-grey-500">Reference</th>

          <th class="text-sm text-grey-500">Amount</th>
          <th class="text-sm text-grey-500">Date</th>
          <th class="text-sm text-grey-500">Countdown(days)</th>
          <th class="text-sm text-grey-500">Subscription</th>
          <th class="text-sm text-grey-500">Status</th>
          <th class="text-sm text-grey-500">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in props.items" :key="index">
          <td>{{ item?.user?.first_name }} {{ item?.user?.last_name }}</td>
          <td>
            <router-link
              :to="`/subscriptions/${item.subscription_id}/details`"
              class="underline"
            >
              {{ item?.subscription_id?.slice(0, 20) }}
            </router-link>
          </td>
          <td>${{ item?.subscription_plan?.price / 100 }}</td>
          <td>{{ $dayjs(item.created_at).format('DD MMM, YYYY') }}</td>
          <td>
            {{
              Math.max(
                0,
                Math.ceil(
                  (new Date(item.next_payment_at).setHours(0, 0, 0, 0) -
                    new Date().setHours(0, 0, 0, 0)) /
                    (1000 * 60 * 60 * 24)
                )
              )
            }}
          </td>
          <td>Tier {{ item?.subscription_plan?.tier }}</td>
          <td>
            <status-pill :status="item.status" />
          </td>
          <td class="">
            <div class="relative">
              <img
                src="/images/svg/action-btn.svg"
                class="w-5 mx-auto cursor-pointer"
                @click="toggleModal(item)"
              />

              <div
                v-if="item.showModal"
                class="absolute z-[10000] shadow-lg top-[20px] right-[-100px] bg-white w-[284px] rounded-bl-lg rounded-r-lg py-6 px-4 !text-left"
                v-click-away="() => closeModal(item)"
              >
                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="
                    () => {
                      $emit('view-sub-details', item);
                      closeModal(item);
                    }
                  "
                >
                  <p class="text-[18px]">View subscription details</p>
                </div>

                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="
                    () => {
                      $emit('view-applications', item);
                      closeModal(item);
                    }
                  "
                >
                  <p class="text-[18px]">View applications</p>
                </div>
              </div>
            </div>
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
    const loading = ref(false);
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
