<template>
  <div class="tabbar-right">
    <el-button :icon="Refresh" circle @click=""></el-button>
    <el-button :icon="FullScreen" circle @click=""></el-button>
    <el-button :icon="Setting" circle @click=""></el-button>
    <img class="img" src="../../../../public/logo.png" />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        admin<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">admin</el-dropdown-item>
          <el-dropdown-item command="e" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { Setting, Refresh, FullScreen } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.tabbar-right {
    display: flex;
    align-items: center;
    margin-right: 10px;
    .img {
      width: 24px;
      height: 24px;
      margin: 0 10px;
      border-radius: 50%;
    }
  }
</style>
