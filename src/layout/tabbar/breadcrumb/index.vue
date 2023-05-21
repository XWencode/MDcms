<template>
    <div class="tabbar-left">
      <el-icon style="margin: 0 10px" @click="isFold">
        <component :is="settingStore.fold?'Expand':'Fold'"></component>
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight} from '@element-plus/icons-vue'
import useSettingStore from '@/store/setting'
let settingStore=useSettingStore()
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
