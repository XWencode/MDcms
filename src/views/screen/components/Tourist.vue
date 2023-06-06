<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>99999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- 盒子将来echarts展示图形图标的节点 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
let people = ref('215908人')
let charts = ref()
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(charts.value)
  //水球图拓展插件
  myChart.setOption({
    // 系列
    series: [
      {
        type: 'liquidFill', //类型
        data: [0.6,0.4,0.2], //展示的数据
        waveAnimation: true, //动画
        animationDuration: 3, //动画时长
        radius: '80%',
        // 轮廓样式
        outline: {
          show: true,
          borderDistance: 5,
          itemStyle: {
            color: 'none',
            borderColor: '#294D99',
            borderWidth: 8,
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.25)'
          }
        }
      }
    ],
    // 布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url('../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin-top:40px;
  margin-left: 20px;
  margin-right: 20px;

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url('../images/dataScreen-title.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 20px;

      span {
        color: yellowgreen;
      }
    }
  }

  .number {
    padding: 10px;
    margin-top: 30px;
    display: flex;

    span {
      flex: 1;
      height: 45px;
      text-align: center;
      line-height: 45px;
      background: url('../images/total.png') no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }

  .charts {
    display: flex;
    width: 100%;
    height: 270px;
    justify-content: center;
    align-items: center;
  }
}
</style>
