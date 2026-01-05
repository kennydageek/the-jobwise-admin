<template>
  <div
    class="w-[278px] shadow-sm px-[27px] py-[43px] bg-white h-[200vh] flex flex-col fixed transition-all z-[10000]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="logo flex justify-between mb-[100px] transition-opacity duration-300"
    >
      <div class="flex gap-2 self-center">
        <img
          src="/images/svg/logo-icon.svg"
          class="w-[39.63px] h-[24.66px]"
          alt=""
        />
        <img
          src="/images/svg/text-logo.svg"
          alt=""
          class="w-[107.76px] h-[16.51px] self-center"
        />
      </div>
      <i
        class="bi bi-x text-primary-100 self-center text-4xl md:hidden flex"
        @click="handleShowSidebar"
      ></i>
    </div>
    <!-- <img
      src="@/assets/images/svg/collapsible.svg"
      alt=""
      class="absolute top-[44px] left-[232px] cursor-pointer"
      @click="handleCollapseSidebar"
      v-if="!isSidebarCollapsed && !isSidebarHovered"
    /> -->

    <div
      class="text-[#6D7A8D] inline-flex flex-col mb-[150px]"
      :class="isSidebarCollapsed"
    >
      <template v-for="(link, i) in links" :key="`link-${i}`">
        <router-link
          :to="{ name: `${link.name}` }"
          v-if="checkRole(link)"
          class="rounded inline-flex mt-2 gap-2 p-4 transition-all hover:bg-secondary-100 hover:bg-text-[#fff] hover:text-[#fff]"
          active-class="bg-primary-100 text-[#fff]"
        >
          <i :class="link.icon"></i>
          <span>{{ link.text }}</span>
        </router-link>
      </template>
    </div>
    <div
      class="text-[#6D7A8D] inline-flex flex-col border-t"
      :class="isSidebarCollapsed"
    >
      <router-link
        @click="handleShowSidebar"
        :to="{ name: 'settings' }"
        class="rounded inline-flex mt-2 gap-2 p-4 transition-all hover:bg-secondary-100 hover:bg-text-[#fff] hover:text-[#fff]"
        active-class="bg-primary-100 text-[#fff]"
      >
        <i class="bi bi-gear"></i>
        <span>Settings</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSidebarStore } from '@/stores/sidebar.js';
import { useUserStore } from '@/stores/users';

const sidebarStore = useSidebarStore();

const isSidebarCollapsed = ref(false);
const isSidebarHovered = ref(false);
const userStore = useUserStore();

const handleCollapseSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const handleMouseEnter = () => {
  isSidebarHovered.value = false;
  isSidebarCollapsed.value = false;
  //   if (isSidebarHovered.value === true) handleCollapseSidebar();
};

const handleMouseLeave = () => {
  isSidebarHovered.value = ref(true);
  isSidebarCollapsed.value = ref(true);
  if (isSidebarHovered.value === false && isSidebarCollapsed.value === true)
    handleCollapseSidebar();
};

const handleShowSidebar = () => {
  sidebarStore.TOGGLE_SIDEBAR(sidebarStore.$state.showSidebar);
};

const links = [
  {
    name: 'dashboard',
    icon: 'bi-grid',
    text: 'Dashboard',
    role: ['super_admin'],
  },

  {
    name: 'users',
    icon: 'bi bi-people',
    text: 'Users',
  },
  {
    name: 'applications',
    icon: 'bi-person-vcard',
    text: 'Applications',
  },

  {
    name: 'subscriptions',
    icon: 'bi bi-file-earmark-zip-fill',
    text: 'Subscriptions',
    role: ['super_admin'],
  },
  {
    name: 'payments',
    icon: 'bi bi-credit-card-2-back-fill',
    text: 'Payments',
    role: ['super_admin'],
  },
  {
    name: 'staffs',
    icon: 'bi bi-people-fill',
    text: 'Staffs',
    role: ['super_admin'],
  },
  {
    name: 'promotions',
    icon: 'bi bi-people-fill',
    text: 'Promotions',
    role: ['super_admin'],
  },
];

const checkRole = (item) => {
  console.log(item);
  if (item?.role) {
    return item?.role?.includes(userStore.user.role.name);
  }
  return true;
};
</script>

<style scoped>
/* Transition for width and hiding text */
div {
  transition: all 0.3s ease-in-out;
}

/* Centering icons when collapsed */
.router-link {
  justify-content: flex-start;
  transition: gap 0.3s ease;
}

.router-link span {
  transition: opacity 0.3s ease-in-out;
}
</style>
