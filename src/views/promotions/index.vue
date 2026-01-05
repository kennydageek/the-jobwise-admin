<template>
  <page-heading title="Promotions" />
  <div class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]">
    <!-- <p class="text-2xl font-semibold text-primary-100">Payments</p> -->
    <div class="flex justify-between relative">
      <!-- <p class="text-primary-100 mt-4 mb-2.5">October 28, 2024</p> -->
      <div class="bg-[#F4F4F4] rounded-[32px] w-[425px] p-3 flex items-center">
        <img src="/images/svg/search.svg" alt="" />
        <input
          type="text"
          class="w-full focus:outline-0 text-[#1C1B1FCC] px-4 border-0 bg-transparent"
          placeholder="Search"
        />
        <img
          src="/images/svg/filter.svg"
          alt="Filter"
          class="cursor-pointer"
          @click="toggleDatePicker"
        />
      </div>
      <div class="flex gap-3">
        <button
          class="bg-secondary-100 text-[#fff] text-sm rounded py-2.5 px-6 border border-[#C3CCD2] font-semibold w-full"
          @click="$router.push({ name: 'promotions-create' })"
        >
          Create Promotion
        </button>
      </div>
      <div v-if="showDatePicker" class="absolute right-0 top-10">
        <vue-date-picker v-model="date" />
      </div>
    </div>
  </div>

  <div class="mt-10 px-6 md:px-20">
    <div class="flex justify-center" v-if="loading">
      <jw-spinner />
    </div>
    <div v-else>
      <coupon-table
        :items="promotionData"
        @view-sub-details="handleViewSubscriptionDetails"
        @view-applications="handleViewApplications"
        @activate="handleActivate"
        @deactivate="handleDeactivate"
        @delete="handleDelete"
      />

      <jw-pagination
        class="mt-10 font-sm"
        v-if="pagination.total"
        :current-page="pagination.current_page"
        :total-records="pagination.total"
        :per-page="pagination.perPage"
        @onchange="fetchUsers"
      />
    </div>
  </div>

  <jw-modal
    @close-modal="showDeleteModal = false"
    :setup="{
      modalActive: showDeleteModal,
      modalTitle: '',
      isVerification: false,
    }"
  >
    <div class="flex flex-col items-center">
      <div class="text-center">
        <p class="text-2xl md:text-[20px] font-bold text-[#242f48] mb-6">
          Delete Promotion
        </p>
        <p class="">Are you sure you want to delete this promotion?</p>
      </div>
    </div>

    <div class="flex justify-between gap-4 mt-6">
      <button
        class="py-4 px-8 bg-[#c3ccd2] grow rounded text-[#252f48]"
        @click="showDeleteModal = false"
      >
        No
      </button>
      <button
        class="py-4 px-8 grow bg-primary-100 rounded text-[#fff]"
        @click="deletePromotion"
      >
        <jw-spinner v-if="deleteLoading" />
        <span v-else>Yes</span>
      </button>
    </div>
  </jw-modal>

  <jw-modal
    @close-modal="showActivateModal = false"
    :setup="{
      modalActive: showActivateModal,
      modalTitle: '',
      isVerification: false,
    }"
  >
    <div class="flex flex-col items-center">
      <div class="text-center">
        <p class="text-2xl md:text-[20px] font-bold text-[#242f48] mb-6">
          Activate Promotion
        </p>
        <p class="">Are you sure you want to activate this promotion?</p>
      </div>
    </div>

    <div class="flex justify-between gap-4 mt-6">
      <button
        class="py-4 px-8 bg-[#c3ccd2] grow rounded text-[#252f48]"
        @click="showActivateModal = false"
      >
        No
      </button>
      <button
        class="py-4 px-8 grow bg-primary-100 rounded text-[#fff]"
        @click="activatePromotion"
      >
        <jw-spinner v-if="activateLoading" />
        <span v-else>Yes</span>
      </button>
    </div>
  </jw-modal>

  <jw-modal
    @close-modal="showDeactivateModal = false"
    :setup="{
      modalActive: showDeactivateModal,
      modalTitle: '',
      isVerification: false,
    }"
  >
    <div class="flex flex-col items-center">
      <div class="text-center">
        <p class="text-2xl md:text-[20px] font-bold text-[#242f48] mb-6">
          Deactivate Promotion
        </p>
        <p class="">Are you sure you want to deactivate this promotion?</p>
      </div>
    </div>

    <div class="flex justify-between gap-4 mt-6">
      <button
        class="py-4 px-8 bg-[#c3ccd2] grow rounded text-[#252f48]"
        @click="showDeactivateModal = false"
      >
        No
      </button>
      <button
        class="py-4 px-8 grow bg-primary-100 rounded text-[#fff]"
        @click="deactivatePromotion"
      >
        <jw-spinner v-if="deactivateLoading" />
        <span v-else>Yes</span>
      </button>
    </div>
  </jw-modal>
  <!-- Vue Date Picker -->

  <!-- <div class="mt-10 flex justify-center">
    <button class="bg-[#5270ED] rounded-lg text-white py-3 px-4">
      View More
    </button>
  </div> -->
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import CouponTable from './components/CouponTable.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { PromotionService, SubscriptionService, UserService } from '@/services';
import JwPagination from '@/components/JwPagination.vue';
import JwSpinner from '@/components/JwSpinner.vue';
import JwModal from '@/components/JwModal.vue';
import { useToast } from 'vue-toastification';

// Reactive state for payment data

const pagination = ref({
  total: 40,
  current_page: 1,
  perPage: 1,
});

const toast = useToast();

const loading = ref(false);
const deleteLoading = ref(false);
const activateLoading = ref(false);
const deactivateLoading = ref(false);

const promotionData = ref([]);
const selectedItem = ref({});
const showDeleteModal = ref(false);
const showActivateModal = ref(false);
const showDeactivateModal = ref(false);

const fetchPromotions = async () => {
  loading.value = true;
  let data = await PromotionService.fetchPromotions();
  pagination.value = data.payload.paging;
  console.log(data);
  promotionData.value = data.payload.rows;
  loading.value = false;
};

const handleActivate = (e) => {
  selectedItem.value = e;
  showActivateModal.value = true;
};

const handleDeactivate = (e) => {
  selectedItem.value = e;
  showDeactivateModal.value = true;
};

const handleDelete = (e) => {
  showDeleteModal.value = true;
  selectedItem.value = e;
};

const deletePromotion = async () => {
  deleteLoading.value = true;
  try {
    const data = await PromotionService.deletePromotion(
      selectedItem.value.promotionId
    );
    toast.success(data.message);
    deleteLoading.value = false;
    fetchPromotions();
    showDeleteModal.value = false;
  } catch (error) {
    deleteLoading.value = false;
  }
};

const activatePromotion = async () => {
  activateLoading.value = true;
  try {
    const data = await PromotionService.activatePromotion(
      selectedItem.value.promotionId
    );
    toast.success(data.message);
    activateLoading.value = false;
    fetchPromotions();
    showActivateModal.value = false;
  } catch (error) {
    activateLoading.value = false;
  }
};

const deactivatePromotion = async () => {
  deactivateLoading.value = true;
  try {
    const data = await PromotionService.deactivatePromotion(
      selectedItem.value.promotionId
    );
    toast.success(data.message);
    deactivateLoading.value = false;
    showDeactivateModal.value = false;
    fetchPromotions();
  } catch (error) {
    deactivateLoading.value = false;
  }
};

onMounted(() => {
  fetchPromotions();
});
</script>

<style lang="scss" scoped></style>
