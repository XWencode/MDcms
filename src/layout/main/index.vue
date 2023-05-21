<template>
  <div class="main">
    <router-view v-slot="{Component}">
      <transition name="fade">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.fade-enter-from{
  opacity: 0;
}
.fade-enter-active{
  transition: all 1s;
}
.fade-enter-to{
  opacity: 1;
}
</style>
