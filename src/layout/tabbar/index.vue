<template>
  <div class="tabbar">
    <Breadcrumb></Breadcrumb>
    <Setting></Setting>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgb(95, 90, 90);
  /* background-image: linear-gradient(
    to right,
    rgb(232, 226, 226),
    rgb(230, 134, 134),
    rgb(234, 83, 83)
  ); */
}
</style>
