<template>
    <div class="tabbar-left">
      <el-icon style="margin: 0 10px" @click="isFold">
        <component :is="settingStore.fold?'Expand':'Fold'"></component>
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: bread.path }" v-for="(bread,index) in $route.matched" :key="index" v-show="bread.name">
          <!-- 图标 -->
          <el-icon>
            <component :is="bread.meta.icon"></component>
          </el-icon>
          <span style="margin-left: 3px;">{{bread.meta.title}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight} from '@element-plus/icons-vue'
import useSettingStore from '@/store/setting'
import { useRoute } from 'vue-router';
let settingStore=useSettingStore()
let $route = useRoute()
const isFold=()=>{
  settingStore.fold=!settingStore.fold
}
</script>

<style lang="scss" scoped>
.tabbar-left {
    display: flex;
    align-items: center;
  }
</style>
