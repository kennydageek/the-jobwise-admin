<template>
  <div
    class="status-pill w-full block"
    :class="status === true ? 'bg-[#09C028]' : 'bg-[#D32F2F]'"
  >
    {{ status === true ? 'Active' : 'Inactive' }}
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
  padding: 6px 6px;
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
