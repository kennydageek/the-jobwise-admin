<script setup>
import JwOtpInput from '@/components/JwOtpInput.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const otpInput = ref(null);
const bindValue = ref('');
const router = useRouter();

const handleVerifyAccount = () => {
  router.push({ name: 'success' });
};

// const handleOnComplete = (value) => {
//   console.log('OTP completed: ', value);
// };

// const handleOnChange = (value) => {
//   console.log('OTP changed: ', value);
// };

// const clearInput = () => {
//   otpInput.value?.clearInput();
// };

// const fillInput = (value) => {
//   otpInput.value?.fillInput(value);
// };
</script>

<template>
  <div class="flex justify-center gap-40 py-[100px] px-[40px] md:px-[200px]">
    <div class="image-side self-center basis-[529px] hidden md:block">
      <img src="/images/svg/celebration.svg" alt="keys" />
    </div>
    <div class="form-side w-full md:basis-[480px]">
      <div class="logo">
        <img src="/images/svg/text-logo.svg" alt="logo" />
      </div>
      <div class="heading mt-[50px] mb-8">
        <img src="/images/svg/celebration-bell.svg" alt="" />
        <h1
          class="text-primary-100 font-bold text-3xl md:text-[40px] leading-[56px]"
        >
          Hurray! <br />Welcome to The Jobwise
        </h1>
        <p
          class="text-[#37445d] text-base font-medium leading-[28px] mt-[14px]"
        >
          Your JobWise account has been created successfully!
        </p>
      </div>

      <router-link :to="{ name: 'login' }">
        <button
          class="rounded px-[30px] py-4 bg-primary-100 w-full text-[#fff] mb-6"
        >
          Explore
        </button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}

.otp-input.is-complete {
  background-color: #e4e4e4;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
