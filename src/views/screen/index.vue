<template>
  <div class="contioner">
    <div class="screen" ref="screen">
      <!-- 数据大屏顶部 -->
      <div class="top">
        <Top />
      </div>
      <!-- 数据大屏底部 -->
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Counter class="counter"></Counter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入顶部组件
import Top from './components/Top.vue'
// 引入左侧组件
import Tourist from './components/Tourist.vue'
import Sex from './components/Sex.vue'
import Age from './components/Age.vue'
// 引入中间地图组件
import Map from './components/map/Map.vue'
import Line from './components/Line.vue'
// 引入右侧组件
import Rank from './components/Rank.vue'
import Year from './components/Year.vue'
import Counter from './components/Counter.vue'
// 获取显示区域的实例
const screen = ref()
onMounted(() => {
  // 屏幕缩放时使显示区域页按规定缩放
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
// 监听屏幕窗口发送大小改变时使显示区域页按规定缩放
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
// 定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  // 屏幕宽度与数据显示区域宽度大小比例
  let ww = window.innerWidth / w
  // 屏幕高度与数据显示区域高度大小比例
  let wh = window.innerHeight / h
  // 当宽度比例小于高度比例时按宽度比例缩放显示区域大小,负否则按高度缩放
  return ww < wh ? ww : wh
}
</script>

<style lang="scss" scoped>
.contioner {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    top: 50%;
    left: 50%;
    transform-origin: top left;
    .top {
      height: 40px;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map{
          flex: 3;
        }
        .line{
          flex: 1;
        }
      }
      .right {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .rank{
          flex: 1.2;
        }
        .year{
          flex: 1;
        }
        .counter{
          flex: 1;
        }
      }
    }
  }
}
</style>
