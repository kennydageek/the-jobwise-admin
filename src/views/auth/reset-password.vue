<template>
  <div class="flex justify-between bg-[#FBFCF8] px-6 md:px-20 py-4">
    <router-link to="/" class="self-center">
      <img src="/images/svg/logo-icon.svg" alt="" />
    </router-link>
    <div class="flex gap-x-5">
      <p class="text-[#000] self-center hidden md:block">
        Don't have an account?
      </p>
      <!-- <router-link :to="{ name: 'register' }">
        <button
          class="self-center py-[14px] px-6 bg-primary-100 rounded-lg text-[#fff]"
        >
          Sign Up
        </button>
      </router-link> -->
    </div>
  </div>
  <div
    class="mx-auto mt-[100px] md:w-[518px] md:border px-6 pb-6 md:p-10 flex flex-col md:gap-10 rounded-xl text-center items-center"
  >
    <img src="/images/svg/reset-illus.svg" alt="" />

    <div class="text">
      <p
        class="text-primary-100 font-bold md:leading-[56px] text-[30px] mb-2 md:mb-6"
      >
        Create Password
      </p>

      <p class="text-[#64748b] text-base">
        Enter a new password different from any previously used passwords
      </p>
    </div>

    <form class="form w-full" @submit.prevent="submitForm">
      <jw-input
        label="OTP"
        type="otp"
        id="password"
        class="mb-6"
        v-model="form.otp"
      />
      <jw-input
        label="Password"
        type="password"
        id="password"
        leftIcon="bi bi-lock"
        rightIcon="bi bi-eye"
        class="mb-6"
        v-model="form.password"
      />

      <jw-input
        label="Confirm Password"
        type="password"
        id="password"
        leftIcon="bi bi-lock"
        rightIcon="bi bi-eye"
        class="mb-10"
        v-model="form.confirm_password"
      />

      <div class="mt-10">
        <button
          class="rounded px-[30px] py-4 bg-primary-100 w-full text-[#fff] mb-6"
        >
          <p v-if="!loading">Reset Password</p>
          <jw-spinner v-else />
        </button>

        <p class="text-sm text-center text-[#6d7a8d]">
          <router-link to="/login" class="text-secondary-100">
            Back to Sign in</router-link
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import JwInput from '@/components/JwInput.vue';
import JwOtpInput from '@/components/JwOtpInput.vue';
import { AuthService } from '@/services';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import JwSpinner from '@/components/JwSpinner.vue';

const toast = useToast();
const loading = ref(false);

// const email = ref('');
const form = ref({
  email: localStorage.getItem('email'),
  otp: '',
  password: '',
  confirm_password: '',
});
const router = useRouter();

const submitForm = async () => {
  try {
    loading.value = true;
    if (form.value.password !== form.value.confirm_password) {
      console.log('ddkd');
      toast.error('Passwords must match');
      return;
    }
    const data = await AuthService.resetPassword(form.value);
    if (data) {
      toast.success(data.message);
      router.push({ name: 'reset-success' });
    }

    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
