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
    <img src="/images/svg/celebration-bell.svg" alt="" />
    <div class="text">
      <p
        class="text-primary-100 font-bold md:leading-[56px] text-[30px] mb-2 md:mb-6"
      >
        Password Updated
      </p>

      <p class="text-[#64748b]">You can now proceed to login</p>
    </div>

    <router-link to="/" class="w-full block mt-10">
      <button class="rounded px-[30px] py-4 bg-primary-100 w-full text-[#fff]">
        Go to Log in
      </button>
    </router-link>
  </div>
</template>

<script setup>
import JwInput from '@/components/JwInput.vue';
import JwOtpInput from '@/components/JwOtpInput.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const router = useRouter();

const handleSendResetOtp = () => {
  router.push({ name: 'email-verification' });
};

const handleVerifyAccount = () => {
  router.push({ name: 'reset-password' });
};
</script>

<style lang="scss" scoped></style>
