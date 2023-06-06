<template>
  <div class="error">
    <img src="../../assets/images/error_images/404.png" alt="">
    <el-button type="primary" size="default" @click="goHome">回到首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const $router=useRouter()
const goHome=()=>{
  $router.push('/home')
}
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
