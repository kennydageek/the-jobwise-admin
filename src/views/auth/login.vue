<script setup>
import JwInput from '@/components/JwInput.vue';
import JwSpinner from '@/components/JwSpinner.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { AuthService, UserService } from '@/services';
import { useUserStore } from '@/stores/users.js';

const router = useRouter();
const userStore = useUserStore();
console.log(userStore);

// Form data
const form = ref({
  email: '',
  password: '',
});

// Validation rules
const rules = {
  email: { required, email },
  password: { required },
};

// Initialize Vuelidate
const v$ = useVuelidate(rules, form);

// Loading state
const loading = ref(false);

// Handle login
const handleLogin = async () => {
  // Validate form
  const isFormCorrect = await v$.value.$validate();

  // Check if form is invalid
  if (!isFormCorrect) {
    console.log('Validation failed', v$.value.$errors);
    return;
  }

  try {
    loading.value = true;

    // Submit form
    // const response = await fetch('exa/auth/customer/login');
    const data = await AuthService.login(form.value);
    console.log(data);

    loading.value = false;

    // Navigate to dashboard
    if (data) {
      localStorage.setItem('access_token', data.payload.access_token);

      const profile = await UserService.fetchProfile();
      console.log(profile);
      if (profile) {
        userStore.UPDATE_USER(profile.payload);
      } else {
        return;
      }

      if (userStore.user.role.name === 'super_admin')
        router.push({ name: 'dashboard' });
      else {
        router.push({ name: 'users' });
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    loading.value = false;
  }
};

// const handleLogin = () => {
//   router.push('/dashboard');
// };
</script>

<template>
  <div class="flex justify-center gap-40 py-[100px] px-[40px] md:px-[200px]">
    <div class="image-side self-center basis-[529px] hidden md:block">
      <img src="/images/svg/key.svg" alt="keys" />
      <div class="text">
        <h1 class="text-primary-100 font-bold text-5xl leading-[48px]">
          Land Your Dream Job Today
        </h1>
        <p class="text-secondary-100 mt-3">
          Unlock thousands of job listings across various industries. With smart
          filters and real-time updates, we help you find the right position to
          grow your career.
        </p>
      </div>
    </div>
    <div class="form-side w-full md:basis-[480px]">
      <div class="logo">
        <img src="/images/svg/text-logo.svg" alt="logo" />
      </div>
      <div class="heading mt-[50px] mb-8">
        <h1
          class="text-primary-100 font-bold text-3xl md:text-[40px] leading-[56px]"
        >
          Welcome back
        </h1>
        <p
          class="text-[#37445d] text-[18px] md:text-xl font-medium leading-[28px] mt-[14px]"
        >
          Sign in to continue
        </p>
      </div>

      <!-- <button
        class="google-form border-[1.5px] rounded border-[#e1e7eb] w-full py-4 flex gap-2 justify-center text-base leading-6 text-[#6d7a8d] font-medium mb-8"
      >
        <img src="@/assets/images/svg/google-icon.svg" alt="" />
        Continue with Google
      </button> -->

      <!-- <img src="@/assets/images/svg/divider.svg" alt="divider" /> -->

      <form class="form mt-6" @submit.prevent="handleLogin">
        <jw-input
          label="Email Address"
          type="email"
          id="email"
          leftIcon="bi bi-envelope"
          class=""
          v-model="form.email"
          @blur="v$.email.$touch()"
        />
        <div v-if="v$.email.$dirty && v$.email.$error" class="mt-1">
          <div v-if="v$.email.required.$invalid">
            <p class="text-error-500 text-xs">Email is required</p>
          </div>
          <div v-else-if="v$.email.email.$invalid">
            <p class="text-error-500 text-xs">Enter a valid email address</p>
          </div>
        </div>

        <jw-input
          label="Password"
          type="password"
          leftIcon="bi bi-lock"
          rightIcon="bi bi-eye"
          class="mt-5"
          v-model="form.password"
          @blur="v$.password.$touch()"
        />

        <div v-if="v$.password.$dirty && v$.password.$error" class="mt-1">
          <div v-if="v$.password.required.$invalid">
            <p class="text-error-500 text-xs">Password is required</p>
          </div>
        </div>

        <div class="flex justify-between mb-8 mt-6">
          <!-- <div class="flex gap-2.5">
            <input
              type="radio"
              class="w-5 h-5 rounded-[50%]"
              name=""
              id="checkbox"
            />
            <label for="checkbox" class="text-sm"> Remember me</label>
          </div> -->

          <router-link
            to="/forgot-password"
            class="text-secondary-100 font-medium text-sm"
            >Forgot Password?</router-link
          >
        </div>

        <div class="mt-6">
          <button
            class="rounded flex justify-center px-[30px] py-4 bg-primary-100 w-full text-[#fff] mb-6"
          >
            <jw-spinner v-if="loading" />
            <p v-else>Sign in</p>
          </button>
          <!-- <p class="text-sm text-center">
            Don’t have an account?
            <router-link :to="{ name: 'register' }" class="text-secondary-100">
              Sign up</router-link
            >
          </p> -->
        </div>
      </form>
    </div>
  </div>
</template>
