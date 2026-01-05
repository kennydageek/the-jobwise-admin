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
        Reset Password
      </p>

      <p class="text-[#64748b]">
        Enter the email address associated with your account and we will send
        you a code to reset your password.
      </p>
    </div>

    <form class="form w-full" @submit.prevent="handleSendResetOtp">
      <jw-input
        label="Email Address"
        type="email"
        id="email"
        leftIcon="bi bi-envelope"
        required
        v-model="email"
        class="mb-6"
      />

      <button
        class="rounded flex justify-center px-[30px] py-4 bg-primary-100 w-full text-[#fff] mb-6"
      >
        <p v-if="!loading">Continue</p>
        <jw-spinner v-else />
      </button>
      <router-link class="text-secondary-100 font-medium text-sm" to="/login"
        >Back to Sign in</router-link
      >
    </form>
  </div>
</template>

<script setup>
import JwInput from '@/components/JwInput.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { AuthService } from '@/services';
import JwSpinner from '@/components/JwSpinner.vue';

const email = ref('');
const loading = ref(false);
const router = useRouter();
const toast = useToast();

const handleSendResetOtp = async () => {
  const payload = {
    email: email.value,
  };

  try {
    loading.value = true;
    const data = await AuthService.forgotPassword(payload);
    if (data) {
      router.push({ name: 'reset-password' });
      toast.success(data.message);
      localStorage.setItem('email', email.value);
    }
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
