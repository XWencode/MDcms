<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man">
        <img src="../images/man.png" alt="" />
      </div>
      <div class="women">
        <img src="../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
//获取图形图标的DOM节点
let charts = ref()
onMounted(() => {
  let myChart = echarts.init(charts.value)
  myChart.setOption({
    title: {},
    xAxis: {
      show: false,
      min: '0',
      max: '100'
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 99,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20
        }
      }
    ],
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  })
})
</script>

<style scoped lang="scss">
.box1 {
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

  .sex {
    display: flex;
    justify-content: center;

    .man {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../images/man-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .women {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../images/woman-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .rate {
    display: flex;
    justify-content: space-between;
    color: white;
  }

  .charts {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
