<template>
  <div class="bg-neutral-100 py-4 px-6 md:px-20 flex justify-between">
    <p class="text-2xl font-medium text-primary-100">{{ props.title }}</p>
    <div class="gap-2.5 flex-end flex self-center relative">
      <div class="flex gap-2.5" @click="handleshowModal">
        <img
          src="/images/svg/profile.svg"
          class="w-[21.5px] h-[21.5px] self-center cursor-pointer"
          alt=""
        />
        <p
          class="font-medium text-primary-100 self-center cursor-pointer hidden md:block"
        >
          {{ userStore.user.first_name }}
          {{ userStore.user.last_name }}
        </p>
      </div>

      <div
        class="absolute shadow-lg flex top-[30px] -right-[5px] bg-white w-[180px] rounded-bl-lg rounded-r-lg flex-col items-center py-6 px-4 z-[1000000000000000]"
        v-if="showModal"
        v-click-away="onClickAway"
      >
        <!-- <div
          class="mt-4 text-[18px] text-neutral-700 cursor-pointer hover:bg-slate-200 self-stretch text-center py-1 transition-all rounded-lg"
        >
          <p class="" @click="$router.push({ name: 'profile' })">Profile</p>
        </div> -->

        <div
          class="mt-4 text-[18px] text-neutral-700 cursor-pointer hover:bg-slate-200 self-stretch text-center py-1 transition-all rounded-lg"
        >
          <p
            class="text-[18px] text-red-500 cursor-pointer"
            @click="handleLogout"
          >
            Sign out
          </p>
        </div>
      </div>

      <i
        class="bi bi-list text-primary-100 self-center text-2xl md:hidden flex"
        @click="handleShowSidebar"
      ></i>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSidebarStore } from '@/stores/sidebar.js';
import { useUserStore } from '@/stores/users.js';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});

const sidebarStore = useSidebarStore();
const userStore = useUserStore();
const showModal = ref(false);
const router = useRouter();

const handleShowSidebar = () => {
  sidebarStore.TOGGLE_SIDEBAR(sidebarStore.$state.showSidebar);
};

const handleshowModal = () => {
  showModal.value = !showModal.value;
};

const onClickAway = () => {
  showModal.value = false;
};

// const away = async () => {
//   showModal.value = false;
// };

const handleLogout = () => {
  localStorage.removeItem('access_token');
  router.push('/');
};
</script>

<style lang="scss" scoped></style>
