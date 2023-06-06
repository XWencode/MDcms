<template>
  <div class="box">
    <div class="title">
      <p>数据统计</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let charts = ref()
onMounted(() => {
  let myChart = echarts.init(charts.value)
  myChart.setOption({
    title: {
      text: '游客的消费水平',
      left:'62%',
      textStyle:{
        color:'yellowgreen'
      },
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '穿着', max: 6500 },
        { name: '住宿', max: 16000 },
        { name: '吃饭', max: 30000 },
        { name: '出行', max: 38000 },
        { name: '游玩', max: 52000 },
        { name: '心情', max: 25000 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: 'Actual Spending'
          }
        ]
      }
    ]
  })
})
</script>

<style lang="scss" scoped>
.box {
  background: url(../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin: 10px 20px;
  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>
