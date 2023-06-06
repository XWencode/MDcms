<template>
  <div ref="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 引入中国地图的JSON资源
import chinaJSON from './china'
let map = ref()
// 注册中国地图
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
  let myChart = echarts.init(map.value)
  myChart.setOption({
    geo: [
      {
        map: 'china',
        roam: true, //鼠标缩放
        // 地图位置
        left: 50,
        top: 150,
        right: 50,
        bottom: 0,
        label: {
          show: true,
          color: 'white'
        },
        // 每一个多边形的样式
        itemStyle: {
          color: '#ff7070'
        },
        emphasis: {
          itemStyle: {
            color: 'red'
          },
          label: {
            fontSize: 40,
            color: 'white'
          }
        }
      }
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    series: {
      type: 'lines', //航线系列
      data: [
        {
          coords: [
            [116.405285, 39.904989], // 起点
            [119.306239, 26.075302] // 终点
          ],
          // 统一的样式设置
          lineStyle: {
            color: 'orange',
            width: 5
          }
        },
        {
          coords: [
            [116.405285, 39.904989], // 起点
            [114.298572, 30.584355] // 终点
          ],
          // 统一的样式设置
          lineStyle: {
            color: 'yellow',
            width: 5
          }
        }
      ],
      //开启动画特效
      effect: {
        show: true,
        symbol: 'arrow',
        color: 'black',
        symbolSize: 10
      }
    }
  })
})
</script>

<style lang="scss" scoped></style>
