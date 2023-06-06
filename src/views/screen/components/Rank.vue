<template>
  <div class="box">
    <div class="title">
      <p>热门景区排行</p>
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
    // 标题组件
    title: {
      text: '景区排行',
      left: '55%',
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20
      },
      // 子标题
      subtext: '各大景区排行',
      subtextStyle: {
        color: 'yellowgreen',
        fontSize: 16
      }
    },
    xAxis: {
      type: 'category' //在x轴均匀分布
    },
    yAxis: {
      max:100,
      min:0,
    },
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70],
        // 柱状图的图形上的文本标签
        label: {
          show: true,
          // 文字位置
          position: 'insideTop',
          //文字颜色
          color: 'yellowgreen'
        },
        //是否显示背景颜色
        showBackground: true,
        backgroundStyle: {
          // 底部背景颜色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'gray' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'skyblue' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          },
          // 边框颜色
          borderColor:''
        },
        // 柱条样式
        itemStyle:{
          // 柱条圆角
          borderRadius:[18,18,0,0],
          // 柱条颜色
          color:'blue'
        }
      }
    ],
    grid: {
      top: 70,
      left: 20,
      right: 20,
      bottom: 10
    }
  })
})
</script>

<style lang="scss" scoped>
.box {
  background: url(../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    width: 100%;
    height: 270px;
    justify-content: center;
    align-items: center;
  }
}
</style>
