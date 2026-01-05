<template>
  <page-heading title="Staffs" />
  <form
    class="px-6 md:pl-20 md:pr-40 mt-[42px] md:mt-[92px]"
    @submit.prevent="createAdmin"
  >
    <p @click="$router.back()" class="cursor-pointer mb-3">&larr; Back</p>
    <p class="text-2xl font-semibold text-primary-100">Create New Staffs</p>
    <div
      class="flex flex-col gap-8 justify-between relative mt-10 shadow-md py-5 pb-10 rounded-lg px-6"
    >
      <jw-input
        label="First Name"
        type="text"
        class="w-full"
        v-model="form.first_name"
        required
      />

      <jw-input
        label="Last Name"
        type="text"
        class="w-full"
        v-model="form.last_name"
        required
      />

      <jw-input
        label="Email"
        type="email"
        class="w-full"
        v-model="form.email"
        required
      />

      <jw-tel-input
        label="Phone number"
        type="tel"
        leftIcon="bi bi-lock"
        v-model="form.phone_number"
        @country-selected="updateRegionCode"
        required
      />

      <select
        name=""
        id=""
        class="px-6 py-3 border border-[#ccc] rounded"
        required
        v-model="form.role_id"
      >
        <option value="">Select Role</option>
        <option :value="role.id" v-for="(role, i) in roles" :key="role.id">
          {{ role.name }}
        </option>
      </select>

      <div class="flex justify-end">
        <button
          class="bg-[#5270ED] text-[#fff] py-3 px-4 rounded text-xs"
          @click="showRoleModal = true"
          type="button"
        >
          Add New Role
        </button>
      </div>
    </div>

    <div class="px-6 mt-[42px] md:mt-[92px]">
      <div class="flex justify-end">
        <button class="bg-[#021863] text-[#fff] py-4 px-8 rounded text-xs">
          <jw-spinner v-if="loading" />
          <div class="flex gap-2.5" v-else>
            <p class="self-center text-base font-semibold">Submit</p>
            <img src="/images/svg/arrow-right.svg" alt="" />
          </div>
        </button>
      </div>
    </div>
  </form>

  <jw-modal
    @close-modal="showRoleModal = false"
    :setup="{
      modalActive: showRoleModal,
      modalTitle: '',
      isVerification: false,
    }"
  >
    <form>
      <div class="flex flex-col">
        <!-- <img
        src="@/assets/images/svg/deleted.svg"
        class="w-[120px] md:w-[240px]"
        alt=""
      /> -->
        <div class="">
          <p
            class="text-2xl text-center md:text-[20px] font-bold text-[#242f48] mb-6"
          >
            Add a New Role
          </p>
          <!-- <p class="">Are you sure you want to deactivate this admin?</p> -->
          <jw-input
            label="Role Title"
            type="text"
            class="w-full"
            v-model="newRole"
            required
          />
        </div>
      </div>

      <div class="flex justify-between gap-4 mt-6">
        <button
          class="py-4 px-8 bg-[#c3ccd2] grow rounded text-[#252f48]"
          @click="showRoleModal = false"
        >
          Cancel
        </button>
        <button
          class="py-4 px-8 grow bg-primary-100 rounded text-[#fff]"
          @click="handleAddRole"
          type="submit"
          :disabled="newRole === ''"
        >
          <jw-spinner v-if="addLoading" />
          <span v-else>Proceed</span>
        </button>
      </div>
    </form>
  </jw-modal>
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import JwInput from '@/components/JwInput.vue';
import JwTelInput from '@/components/JwTelInput.vue';
import JwModal from '@/components/JwModal.vue';
import { onMounted, ref } from 'vue';
import { StaffService } from '@/services';
import JwSpinner from '@/components/JwSpinner.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const newRole = ref('');

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  region_code: 'US',
  role_id: 'Select role',
});

const roles = ref([]);

const loading = ref(false);

const updateRegionCode = (e) => {
  form.value.region_code = e.code;
};

const showRoleModal = ref(false);
const addLoading = ref(false);
const handleAddRole = async () => {
  try {
    addLoading.value = ref(true);
    const payload = {
      name: newRole.value,
    };
    const data = await StaffService.createAdminRole(payload);
    showRoleModal.value = false;
    fetchAdminRoles();
    addLoading.value = ref(false);
  } catch (error) {
    addLoading.value = ref(false);
  }
};

const createAdmin = async () => {
  try {
    loading.value = true;
    const data = await StaffService.createAdmin(form.value);
    loading.value = false;
    router.push({ name: 'staffs' });

    console.log(data);
  } catch (error) {
    loading.value = false;
  }
  console.log(form.value);
};

const fetchAdminRoles = async () => {
  const data = await StaffService.fetchAdminRoles();
  roles.value = data.payload;
  console.log(data);
};

onMounted(() => {
  fetchAdminRoles();
});
</script>

<style lang="scss" scoped></style>
