<template>
  <div
    class="status-pill w-full block"
    :class="
      status === 'active' || status === 'successful'
        ? 'bg-[#09C028]'
        : status === 'cancelled'
        ? 'bg-[#EB3232]'
        : status === 'free_trial'
        ? 'bg-[#5270ed]'
        : 'bg-[#5270ED]'
    "
  >
    {{ status }}
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="css" scoped>
.status-pill {
  padding: 6px 0;
  text-align: center;
  border-radius: 8px;
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 400;
  /* width: 90px; */
  border-radius: 215px;
  color: #fff;
  display: block;
}
</style>
