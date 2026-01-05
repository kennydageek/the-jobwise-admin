<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:activeTab']);
const currentTab = ref(props.activeTab);

watch(
  () => props.activeTab,
  (newVal) => {
    currentTab.value = newVal;
  }
);

const selectTab = (index) => {
  currentTab.value = index;
  emit('update:activeTab', index);
};
</script>

<template>
  <div>
    <nav class="mb-4 flex overflow-scroll no-scrollbar" aria-label="Tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="py-4 px-8 flex flex-col md:flex-row gap-2 text-sm"
        :class="[
          currentTab === index
            ? 'bg-primary-100 text-[#fff] rounded-tl-lg font-medium rounded-tr-lg'
            : ' text-sm',
          'text-sm',
        ]"
        @click="selectTab(index)"
      >
        <img
          v-show="currentTab === index && tab.icon"
          class="self-center"
          :src="tab.icon"
          alt=""
        />
        <img
          v-show="currentTab !== index && tab.iconVariant"
          class="self-center"
          :src="tab.iconVariant"
          alt=""
        />
        <p class="self-center text-xs md:text-sm">{{ tab.title }}</p>
      </button>
    </nav>

    <div class="tab-content">
      <slot :name="tabs[currentTab]?.name"></slot>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Add any specific styles if necessary */
</style>
