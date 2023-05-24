<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: settingStore.fold }">
      <div class="logo">
        <img class="logo_img" :src="LOGO" />
        <p class="logo_title">{{ TITLE }}</p>
      </div>
      <el-scrollbar class="menu_scroll">
        <el-menu
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          :collapse="settingStore.fold"
          collapse-transition
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabber" :class="{ fold: settingStore.fold }">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main" :class="{ fold: settingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { LOGO,TITLE } from '@/global'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
// 获取用户相关小仓库
import useUserState from '@/store/modules/user/user'
import useSettingStore from '@/store/setting'
let userStore = useUserState()
let settingStore = useSettingStore()
let $route = useRoute()
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100%;
    background-color: $base-menu-background;
    transition: all 0.3s;
    &.fold {
      width: $base-menu-mini-width;
    }
    .logo {
      width: 100%;
      height: $base-logo-height;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      .logo_img {
        width: $base-logo-width;
        height: $base-logo-height;
        padding-left: 10px;
      }
      .logo_title {
        white-space: nowrap;
        overflow: hidden;
        font-size: $base-title-font;
        color: white;
        margin-left: 10px;
      }
    }
    .menu_scroll {
      width: 100%;
      height: calc(100% - $base-logo-width);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabber {
    width: calc(100% - $base-menu-width);
    height: $base-menu-tabber;
    position: fixed;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-mini-width);
      left: $base-menu-mini-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-menu-tabber);
    top: $base-menu-tabber;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-mini-width);
      left: $base-menu-mini-width;
    }
  }
}
</style>
