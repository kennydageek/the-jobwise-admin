<template>
  <page-heading title="Staffs" />
  <div class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]">
    <p class="text-2xl font-semibold text-primary-100">Staffs</p>
    <div class="flex justify-between relative mt-10">
      <!-- <p class="text-primary-100 mt-4 mb-2.5">October 28, 2024</p> -->
      <div class="self-center flex gap-[15px]">
        <p class="text-[#343A40] text-[18px]">All(6)</p>
        <img src="/images/svg/arrow_drop_down.svg" alt="" />
        <button
          class="py-[7px] px-[15px] gap-2.5 bg-[#233EAE] rounded-[20px] flex"
        >
          <router-link to="/staffs/create" class="text-base text-[#fff]"
            >ADD NEW</router-link
          >
          <img src="/images/svg/plus-icon.svg" alt="" />
        </button>
      </div>
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
      <div v-if="showDatePicker" class="absolute right-0 top-10">
        <vue-date-picker v-model="date" />
      </div>
    </div>
  </div>

  <div class="mt-10 px-6 md:pl-20 md:pr-40">
    <staff-table
      :items="staffData"
      @deactivate-admin="handleShowDeactivateModal"
      @activate-admin="handleShowActivateModal"
      :loading="loading"
    />
  </div>

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
          Deactivate Admin
        </p>
        <p class="">Are you sure you want to deactivate this admin?</p>
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
        @click="handleDeactivateAdmin"
      >
        <jw-spinner v-if="deactivateLoading" />
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
          Activate Admin
        </p>
        <p class="">Are you sure you want to activate this admin?</p>
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
        @click="handleActivateAdmin"
      >
        <jw-spinner v-if="deactivateLoading" />
        <span v-else>Yes</span>
      </button>
    </div>
  </jw-modal>
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import StaffTable from './components/StaffTable.vue';
import { onMounted, ref } from 'vue';
import Avatar from '/images/svg/staff-avatar.svg';
import JwModal from '@/components/JwModal.vue';
import { StaffService } from '@/services';
import JwSpinner from '@/components/JwSpinner.vue';

const showDatePicker = ref(false);
const staffData = ref([]);
const loading = ref(false);
const deactivateLoading = ref(false);

const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value;
};

const date = ref('');
const showDeactivateModal = ref(false);
const showActivateModal = ref(false);

const selectedAdmin = ref({});

const handleShowDeactivateModal = (e) => {
  selectedAdmin.value = e;
  showDeactivateModal.value = true;
  console.log(selectedAdmin.value);
};

const handleDeactivateAdmin = async () => {
  try {
    deactivateLoading.value = true;
    const payload = {
      admin_id: selectedAdmin.value.admin_id,
      status: 'inactive',
    };
    const data = await StaffService.updateAdminStatus(payload);
    fetchAllAdmin();
    deactivateLoading.value = false;
    showDeactivateModal.value = false;
  } catch (error) {
    deactivateLoading.value = true;
  }
  console.log('deactivating');
};

const handleShowActivateModal = (e) => {
  selectedAdmin.value = e;
  showActivateModal.value = true;
  console.log(selectedAdmin.value);
};

const handleActivateAdmin = async () => {
  try {
    deactivateLoading.value = true;
    const payload = {
      admin_id: selectedAdmin.value.admin_id,
      status: 'active',
    };
    const data = await StaffService.updateAdminStatus(payload);
    fetchAllAdmin();
    showActivateModal.value = false;
    deactivateLoading.value = false;
  } catch (error) {
    deactivateLoading.value = false;
  }
};

const pagination = ref({});
// connst perPage = ref()

const fetchAllAdmin = async () => {
  try {
    loading.value = true;
    const data = await StaffService.fetchAdmins(pagination.value);
    pagination.value = data.payload.paging;
    staffData.value = data.payload.rows;
    console.log(data);
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAllAdmin();
});
</script>

<style lang="scss" scoped></style>
