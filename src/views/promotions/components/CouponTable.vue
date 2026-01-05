<template>
  <div class="">
    <table class="w-full">
      <thead>
        <tr class="rounded-[16px]">
          <th class="rounded-l-[16px] text-sm text-grey-500">S/N</th>
          <th class="text-sm text-grey-500">Promo Code</th>
          <th class="text-sm text-grey-500">Discount type</th>
          <th class="text-sm text-grey-500">Discount Amount</th>
          <th class="text-sm text-grey-500">Discount Percent</th>

          <th class="text-sm text-grey-500">Duration (months)</th>
          <th class="text-sm text-grey-500">Status</th>
          <th class="text-sm text-grey-500">Max redemption</th>
          <th class="text-sm text-grey-500">Redemption Count</th>
          <th class="text-sm text-grey-500">Start Date</th>
          <th class="text-sm text-grey-500">Expiry Date</th>
          <th class="text-sm text-grey-500">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in props.items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item?.code }}</td>
          <td class="capitalize">
            {{ item?.discountType }}
          </td>
          <td class="capitalize">
            {{ item.amountOff ? `$${item?.amountOff / 100}` : '--' }}
          </td>
          <td class="capitalize">
            {{ item?.percentOff ? `${item?.percentOff}%` : '--' }}
          </td>
          <td>{{ item?.durationInMonths || '--' }}</td>
          <td>
            <status-pill :status="item.active" />
          </td>
          <td>{{ item.maxRedemptions }}</td>
          <td>{{ item.redemptionCount }}</td>

          <td>{{ $dayjs(item.startsAt).format('MMM DD, YYYY') }}</td>
          <td>{{ $dayjs(item.expiresAt).format('MMM DD, YYYY') }}</td>

          <td class="">
            <div class="relative">
              <img
                src="/images/svg/action-btn.svg"
                class="w-5 mx-auto cursor-pointer"
                @click="toggleModal(item)"
              />

              <div
                v-if="item.showModal"
                class="absolute z-[10000] shadow-lg top-[20px] right-[-0px] bg-white w-[200px] rounded-bl-lg rounded-r-lg py-6 px-4 !text-left"
                v-click-away="() => closeModal(item)"
              >
                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="
                    () => {
                      $emit('activate', item);
                      closeModal(item);
                    }
                  "
                  v-if="item.active === false"
                >
                  <p class="text-[18px]">Activate</p>
                </div>

                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="
                    () => {
                      $emit('deactivate', item);
                      closeModal(item);
                    }
                  "
                  v-if="item.active"
                >
                  <p class="text-[18px]">Deactivate</p>
                </div>
                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="
                    () => {
                      $emit('delete', item);
                      closeModal(item);
                    }
                  "
                >
                  <p class="text-[18px] text-red-500">Delete</p>
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
