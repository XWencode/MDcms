<template>
  <div class="home">
    <el-card class="el_card">
      <div class="card">
        <img class="img" :src="userState.avatar" />
        <div class="home_right">
          <div class="name">{{ getTime() }}{{ userState.username }}</div>
          <div class="title">{{ TITLE }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useUserState from '@/store/modules/user/user'
import { TITLE } from '@/global'
import getTime from '@/utils/time'
let userState = useUserState()
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  background: no-repeat center/100% url('../../assets/images/home.webp');
}
.el_card {
  border: none;
  background-color: transparent;
  .card {
    display: flex;
    align-items: center;
    .img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 10px;
    }
    .home_right {
      padding: 10px;
      .name {
        font-weight: 700;
        font-size: 24px;
        margin: 20px 0;
      }
      .title {
        color: rgb(184, 181, 181);
        font-size: 16px;
        font-style: italic;
      }
    }
  }
}
</style>
