<template>
  <div class="flex justify-between bg-[#FBFCF8] px-6 md:px-20 py-4">
    <router-link to="/" class="self-center">
      <img src="/images/svg/logo-icon.svg" alt="" />
    </router-link>
    <div class="flex gap-x-5">
      <p class="text-[#000] self-center hidden md:block">
        Don't have an account?
      </p>
    </div>
  </div>
  <div
    class="mx-auto mt-[100px] md:w-[518px] md:border px-6 pb-6 md:p-10 flex flex-col md:gap-10 rounded-xl text-center items-center"
  >
    <img src="/images/svg/email-verification-illus.svg" alt="" />
    <div class="text">
      <p
        class="text-primary-100 font-bold md:leading-[56px] text-[30px] mb-2 md:mb-6"
      >
        Email Verification
      </p>

      <p class="text-[#64748b]">
        We have sent a code to your Email,
        <span class="font-semibold">{{ email }}</span>
      </p>
    </div>

    <form class="mt-10" @submit.prevent="handleVerifyAccount">
      <div>
        <jw-otp-input :digit-count="6" @update:otp="otpValue = $event" />
      </div>

      <div class="mt-10">
        <button
          class="rounded px-[30px] py-4 bg-primary-100 w-full text-[#fff] mb-6"
        >
          Verify Account
        </button>
        <p class="text-sm text-center">
          Didn't receive code?
          <span class="text-secondary-100" @click="handleResendCode">
            Resend</span
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import JwInput from '@/components/JwInput.vue';
import JwOtpInput from '@/components/JwOtpInput.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { AuthService } from '@/services';

const email = localStorage.getItem('email');
const router = useRouter();
const toast = useToast();
const loading = ref(false);
const otpValue = ref('');

const handleSendResetOtp = async () => {
  const payload = {
    email: email,
    otp: otpValue.value,
  };
  try {
    loading.value = true;
    const data = await AuthService.verifyEmail(payload);
    if (data) {
      router.push({ name: 'success' });
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

const handleResendCode = async () => {
  const payload = {
    email: email,
    otp: otpValue.value,
  };

  try {
    loading.value = true;
    const data = await AuthService.resendEmailVerification(payload);
    if (data) {
      toast.success(data.message);
    }
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};

const handleUpdateOtp = (e) => {
  otpValue.value = e;
};

// const handleSendResetOtp = () => {
//   router.push({ name: 'email-verification' });
// };

// const handleVerifyAccount = () => {
//   router.push({ name: 'reset-password' });
// };
</script>

<style lang="scss" scoped></style>
