<template>
  <div class="bg-neutral-100 py-4 px-6 md:px-20 flex justify-between">
    <p class="text-2xl font-medium text-primary-100">{{ props.title }}</p>
    <div
      class="flex justify-between rounded-[32px] px-4 bg-[#eaf1fb] w-[200px] md:w-[400px]"
    >
      <img src="/images/svg/lens.svg" alt="" />
      <input
        type="text"
        class="focus:outline-none p-[12px] bg-transparent grow"
      />
      <img src="/images/svg/tune.svg" alt="" />
    </div>
    <div class="gap-2.5 flex-end flex self-center">
      <img
        src="/images/svg/profile.svg"
        class="w-[21.5px] h-[21.5px] self-center cursor-pointer"
        alt=""
        @click="$router.push({ name: 'profile' })"
      />
      <p
        class="font-medium text-primary-100 self-center cursor-pointer hidden md:block"
        @click="$router.push({ name: 'profile' })"
      >
        Emmanuel Adegbola
      </p>
      <i
        class="bi bi-list text-primary-100 self-center text-2xl md:hidden flex"
        @click="handleShowSidebar"
      ></i>
    </div>
  </div>
</template>

<script setup>
import { useSidebarStore } from '@/stores/sidebar.js';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});

const sidebarStore = useSidebarStore();

const handleShowSidebar = () => {
  sidebarStore.TOGGLE_SIDEBAR(sidebarStore.$state.showSidebar);
};
</script>

<style lang="scss" scoped></style>
