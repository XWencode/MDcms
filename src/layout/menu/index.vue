<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 没有子路由的情况 -->
    <template v-if="!item.children">
      <el-menu-item v-if="item.meta.isshow" :index="item.path" @click="goRouter">
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
    <!-- 有子路由但是只有一个 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item :index="item.path" v-if="item.meta.isshow" @click="goRouter">
        <el-icon><component :is="item.children[0].meta.icon"></component></el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由且有多个 -->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu :index="item.path" v-if="item.meta.isshow">
        <template #title>
          <el-icon><component :is="item.meta.icon"></component></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 这里使用递归组件(自己使用自己) -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
defineProps(['menuList'])
let $route = useRouter()
const goRouter = (vc:any) => {
  $route.push(vc.index)
}
</script>
<!-- 为递归组件(自己)命名 -->
<script lang="ts">
export default {
  name: 'Menu'
}
</script>
<style lang="scss" scoped>
.menu {
}
</style>
