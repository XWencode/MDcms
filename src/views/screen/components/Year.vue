<template>
  <div class="box">
    <div class="title">
      <p>年度游客量对比</p>
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
    title:{
      text:'散点图',
    },
    xAxis:{
      type:'category'
    },
    yAxis:{},
    series:{
      type:'scatter',
      data:[12,22,88,45,36,210,99,55,126,45,160,56,231],
      symbol:'pin',
      symbolSize:16,
      label:{
        show:true,
        position:'top',
        color:"#fff"
      }
    },
    grid: {
      top:20,
      left: 20,
      right:20,
      bottom: 10
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
