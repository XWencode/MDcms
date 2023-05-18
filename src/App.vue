<template>
  <div class="app">
    <h1>dfasdf</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
  axios({
    url: '/api/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111'
    }
  })
})
</script>

<style scoped lang="scss">
.app{
  h1{
    color: red;
  }
}
</style>
