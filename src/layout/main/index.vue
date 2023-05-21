<template>
  <div class="main">
    <router-view v-slot="{Component}">
      <transition name="fade">
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch,ref,nextTick } from 'vue';
import useSettingStore from '@/store/setting';
let settingStore = useSettingStore()
// 控制组件刷新的变量
let flag = ref(true)
watch(()=>settingStore.isrefresh,()=>{
  flag.value=false
  nextTick(()=>{
    flag.value=true
  })
})
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
