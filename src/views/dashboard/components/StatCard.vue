<template>
  <div class="flex p-6 bg-neutral-100 gap-10 rounded-lg md:justify-between">
    <div class="flex flex-col">
      <img
        src="/images/svg/calendar-icon.svg"
        class="self-center w-[24px] h-[24px]"
        alt=""
      />
      <p class="font-bold text-[32px] mt-3">{{ items.count }}</p>
    </div>
    <div class="flex flex-col">
      <p class="text-[#021863] font-medium">{{ items.title }}</p>
      <div class="mt-6 flex gap-6">
        <div class="flex gap-1">
          <p class="text-[#5270ED]">{{ items.growth }}</p>
          <img src="/images/svg/caret-top-purple.svg" class="w-[7px]" alt="" />
        </div>
        <img src="/images/svg/chart.svg" alt="" />
      </div>
    </div>

    <!-- <div class="text-[#000] self-center">
      <p class="font-medium">{{ items.title }}</p>
    </div> -->
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped></style>
