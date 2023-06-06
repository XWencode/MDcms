<template>
  <div class="top">
    <div class="left">
      <router-link to="/home" class="lbtn">首页</router-link>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据展示平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间:{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import moment from 'moment'
// 存储当前时间
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
// 存储定时器
let timer = ref(0)
// 动态改变时间
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  .left {
    flex: 1;
    background: url('../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: 100% 100%;
    .lbtn {
      width: 150px;
      height: 40px;
      line-height: 40px;
      background: url('../images/dataScreen-header-btn-bg-l.png') no-repeat;
      background-size: 100% 100%;
      float: right;
      text-align: center;
      color: #29fcff;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url('../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: url('../images/dataScreen-header-right-bg.png') no-repeat;
    background-size: 100% 100%;
    .rbtn {
      width: 150px;
      height: 40px;
      line-height: 40px;
      background: url('../images/dataScreen-header-btn-bg-r.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      color: #29fcff;
    }
    .time {
      margin-right: 15px;
      color: #29fcff;
      font-size: 17px;
    }
  }
}
</style>
