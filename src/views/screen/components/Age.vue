<template>
  <div class="box">
    <div class="title">
      <p>年龄比例</p>
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
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 40,
      right: 10,
      orient:'vertical',//图例组件方向设置
      textStyle:{
        color:'white',
        fontSize:18
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          position: 'inside',
          color:'white'
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 300, name: '0-16' },
          { value: 1200, name: '17-25' },
          { value: 580, name: '26-40' },
          { value: 484, name: '41-60' },
          { value: 300, name: '60以上' }
        ]
      }
    ],
    grid: {
      top: 0,
      left: 0,
      right:0,
      bottom: 0
    }
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
