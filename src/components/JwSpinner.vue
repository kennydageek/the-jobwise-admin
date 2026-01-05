<template>
  <span class="loader w-6 h-6 border-1"></span>
</template>

<script>
export default {};
</script>

<style scoped>
.loader {
  /* width: 48px;
  height: 48px; */
  border: 4px solid #edefef;
  border-bottom-color: #021863;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
