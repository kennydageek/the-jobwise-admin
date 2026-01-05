<template>
  <page-heading title="Profile" />

  <div class="px-6 md:px-20 md:pr-[200px] mt-[42px] md:mt-[92px]">
    <JwTabs :tabs="tabs" v-model:activeTab="activeTab">
      <template v-slot:notification>
        <notification />
      </template>
      <template v-slot:banner> <banner /> </template>
      <template v-slot:settings> <settings /> </template>
    </JwTabs>
  </div>
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import JwTabs from '@/components/JwTabs.vue';
import { ref } from 'vue';
import UserCircle from '/images/svg/bell.svg';
import UserCircleVariant from '/images/svg/bell-black.svg';
import SettingVariant from '/images/svg/banner.svg';
import Settingss from '/images/svg/banner-black.svg';
import PricingVariant from '/images/svg/setting-black.svg';
import Pricing from '/images/svg/setting.svg';

import notification from './notification.vue';
import Banner from './banner.vue';
import Settings from './setting.vue';

const activeTab = ref(0);

const tabs = [
  {
    icon: UserCircle,
    iconVariant: UserCircleVariant,
    name: 'notification',
    title: 'Notifications',
  },
  {
    icon: Settingss,
    iconVariant: SettingVariant,
    name: 'banner',
    title: 'Banner',
  },
  {
    icon: Pricing,
    iconVariant: PricingVariant,
    name: 'settings',
    title: 'Setting',
  },
];
</script>

<style scoped></style>
