<template>
  <div class="home">
    home路由页面
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserState from '@/store/modules/user/user';
let userState = useUserState()
onMounted(() => {
  // 发请求获取用户信息
  userState.getUserInfo()
})
</script>

<style lang="scss" scoped>
.home {

}
</style>
