<template>
  <div class="px-6 md:pl-20 md:pr-40 mt-10 md:mt-10">
    <p @click="$router.back()" class="cursor-pointer mb-3 text-secondary-100">
      &larr; Back
    </p>
    <p class="text-[#021863] text-2xl font-semibold">Job Application Form</p>

    <form
      class="flex flex-col gap-8 justify-between relative mt-10 py-5 pb-10 rounded-lg"
      @submit.prevent="handleCreatePromotion"
    >
      <jw-input
        label="Code"
        type="text"
        class="w-full"
        v-model="promoForm.code"
        placeholder="December20"
      />
      <jw-select
        :options="discountTypeOptions"
        placeholder="Select Discount type"
        label="Select Discount Type"
        v-model="promoForm.discount_type"
        @change="handleChangeDiscountType"
      />

      <jw-input
        v-if="promoForm.discount_type === 'fixed'"
        label="Amount Off ($)"
        type="text"
        class="w-full"
        v-model="promoForm.amount_off"
      />

      <jw-input
        label="Percent Off (%)"
        type="text"
        class="w-full"
        v-model="promoForm.percent_off"
        v-else
      />

      <jw-select
        :options="durationOptions"
        placeholder="Select Duration"
        label="Duration"
        v-model="promoForm.duration"
        @change="handleChangeDuration"
      />

      <jw-input
        label="Duration (months)"
        type="text"
        class="w-full"
        v-model="promoForm.duration_in_months"
        v-if="promoForm.duration === 'repeating'"
      />

      <jw-input
        label="Max Redemption"
        type="number"
        class="w-full"
        v-model="promoForm.max_redemptions"
        placeholder="20"
      />

      <jw-input
        label="Start Date"
        type="date"
        class="w-full"
        v-model="promoForm.starts_at"
      />

      <jw-input
        label="Expiry Date"
        type="date"
        class="w-full"
        v-model="promoForm.expires_at"
      />

      <div class="flex justify-end">
        <button
          class="bg-secondary-100 text-[#fff] text-sm rounded py-2.5 px-6 border border-[#C3CCD2] font-semibold"
        >
          <jw-spinner v-if="promotionLoading" />
          <span v-else> Create Promotion </span>
        </button>
      </div>
    </form>
  </div>

  <!-- <jw-modal
    @close-modal="showCouponModal = false"
    :setup="{
      modalActive: showCouponModal,
      modalTitle: 'Create Coupon',
      isVerification: false,
      large: true,
    }"
  >
    <form
      @submit.prevent="createJobApplication"
      class="flex flex-col gap-8 justify-between relative mt-10 py-5 pb-10 rounded-lg"
    >
   

      <jw-input
        label="Max Redemption"
        type="number"
        class="w-full"
        v-model="form.max_redemptions"
        placeholder="20"
      />

      <div class="flex justify-between gap-4 mt-6">
        <button
          class="py-4 px-8 bg-red-600 grow rounded text-white"
          @click="showCouponModal = false"
        >
          Cancel
        </button>
        <button
          class="py-4 px-8 grow bg-primary-100 rounded text-[#fff]"
          @click="createCoupon"
        >
          <jw-spinner v-if="couponLoading" />
          <span v-else>Create Coupon</span>
        </button>
      </div>
    </form>
  </jw-modal> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import JwInput from './components/JwInput.vue';
import JwSelect from './components/JwSelect.vue';
import { PromotionService } from '@/services';
// import JwModal from '@/components/JwModal.vue';
// import JwToggle from '@/components/JwToggle.vue';
import JwSpinner from '@/components/JwSpinner.vue';
import { useToast } from 'vue-toastification';
import { useCouponStore } from '@/stores/coupon';
import { useRouter } from 'vue-router';

const couponStore = useCouponStore();
const toast = useToast();
const router = useRouter();

const showCouponModal = ref(false);
const selectedCouponDetails = ref({});
const showSelectedCouponDetails = ref(false);
const promotionsId = ref('');

const promoForm = ref({
  code: '',
  discount_type: '',
  max_redemptions: '',
  expires_at: '',
  max_redemptions: '',
  starts_at: '',
  percent_off: '',
  amount_off: '',
  duration: '',
  duration_in_months: '',
});

const couponOptions = ref([]);
const couponLoading = ref(false);
const promotionLoading = ref(false);
const discountTypeOptions = ref([
  {
    name: 'percentage',
    value: 'percentage',
  },
  {
    name: 'fixed',
    value: 'fixed',
  },
]);

const durationOptions = ref([
  {
    name: 'once',
    value: 'once',
  },
  {
    name: 'forever',
    value: 'forever',
  },
  {
    name: 'repeating',
    value: 'repeating',
  },
]);

const handleChangeDiscountType = (e) => {
  promoForm.value.discount_type = e.target.value;
};
const handleChangeDuration = (e) => {
  promoForm.value.duration = e.target.value;
};

const fetchCouponCodes = async () => {
  let data = await PromotionService.fetchCouponCodes();

  couponStore.UPDATE_COUPON(data.payload.data);

  couponOptions.value = data.payload.data.map((coupon) => ({
    name: coupon.name, // label shown in dropdown
    value: coupon.id, // actual value bound to v-model
  }));
};

const handleCreatePromotion = async () => {
  promotionLoading.value = true;
  try {
    const payload = {
      code: promoForm.value.code,
      discount_type: promoForm.value.discount_type,
      duration: promoForm.value.duration,
      starts_at: promoForm.value.starts_at,
      expires_at: promoForm.value.expires_at,
      max_redemptions: +promoForm.value.max_redemptions,
    };

    if (promoForm.value.discount_type === 'fixed') {
      payload.amount_off = (+promoForm.value.amount_off).toFixed(2) * 100;
    } else {
      payload.percent_off = +promoForm.value.percent_off;
    }

    if (promoForm.value.duration === 'repeating') {
      payload.duration_in_months = +promoForm.value.duration_in_months;
    }

    const data = await PromotionService.createPromotionCode(payload);
    toast.success(data.message);
    promotionLoading.value = false;
    router.push('/promotions');
  } catch (error) {
    console.log(error);
    promotionLoading.value = false;
  }
};

const fetchPromotionsById = async (e) => {
  const data = await PromotionService.fetchPromotionsById(e);
  console.log(data);
};

const updateStripeCouponId = (e) => {
  // promotionsId.value
  fetchPromotionsById(e);
  console.log(e);
};

const handleUpdateSelectCouponDetails = (id) => {
  console.log(promoForm.value);
  selectedCouponDetails.value = couponStore.coupon.find(
    (e) => id.target.value === e.id
  );
  showSelectedCouponDetails.value = true;
  console.log(selectedCouponDetails.value);
};

onMounted(() => {
  fetchCouponCodes();
});
</script>

<style lang="scss" scoped></style>
