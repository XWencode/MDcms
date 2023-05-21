<template>
  <div class="tabbar-right">
    <el-button :icon="Refresh" circle @click="refresh"></el-button>
    <el-button :icon="FullScreen" circle @click="fullscreen"></el-button>
    <el-button :icon="Setting" circle @click=""></el-button>
    <img class="img" :src="userState.avatar" />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{userState.username}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">{{userState.username}}</el-dropdown-item>
          <el-dropdown-item command="e" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { Setting, Refresh, FullScreen } from '@element-plus/icons-vue'
import useSettingStore from '@/store/setting';
import useUserState from '@/store/modules/user/user';
let settingStore = useSettingStore()
let userState = useUserState()
// 刷新按钮回调事件
const refresh=()=>{
  settingStore.isrefresh=!settingStore.isrefresh
}
// 全屏显示
const fullscreen=()=>{
  // dom对象一个属性用来判断是否为全屏显示
  let el = document.fullscreenElement
  if(!el){
    // 全屏显示
    document.documentElement.requestFullscreen()
  }else{
    // 退出全屏
    document.exitFullscreen()
  }
}
</script>

<style lang="scss" scoped>
.tabbar-right {
    display: flex;
    align-items: center;
    margin-right: 10px;
    .img {
      width: 32px;
      height: 32px;
      margin: 0 10px;
      border-radius: 50%;
    }
  }
</style>
