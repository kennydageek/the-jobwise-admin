<template>
  <p class="font-semibold text-[#021863] text-2xl mt-6">Change your password</p>
  <form class="form mt-6" @submit.prevent="handleUpdatePassword">
    <jw-input
      label="Old Password"
      type="password"
      leftIcon="bi bi-lock"
      rightIcon="bi bi-eye"
      class="mt-5"
      v-model="form.password"
      required
    />
    <jw-input
      label="New Password"
      type="password"
      leftIcon="bi bi-lock"
      rightIcon="bi bi-eye"
      class="mt-5"
      v-model="form.new_password"
      required
    />

    <jw-input
      label="Confirm Password"
      type="password"
      leftIcon="bi bi-lock"
      rightIcon="bi bi-eye"
      class="mt-5"
      v-model="form.confirm_password"
      required
    />

    <div class="mt-10 flex justify-end">
      <button
        class="bg-[#021863] text-[#fff] py-4 px-8 rounded text-xs flex gap-2.5"
      >
        <jw-spinner v-if="loading" />
        <span v-else>
          <p class="self-center text-base font-semibold">Update Password</p>
        </span>
      </button>
    </div>
  </form>
</template>

<script setup>
import JwInput from '@/components/JwInput.vue';
import JwSpinner from '@/components/JwSpinner.vue';
import { SettingService } from '@/services';
import { useToast } from 'vue-toastification';
import { ref } from 'vue';

const toast = useToast();
const loading = ref(false);
const form = ref({
  new_password: '',
  confirm_password: '',
  password: '',
});

const handleUpdatePassword = async () => {
  try {
    loading.value = true;
    const data = await SettingService.updatePassword(form.value);
    toast.success(data.message);
    console.log(data);
    loading.value = false;
    form.value.confirm_password = '';
    form.value.new_password = '';
    form.value.password = '';
  } catch (error) {}
  console.log(form.value);
};
</script>

<style lang="scss" scoped></style>
