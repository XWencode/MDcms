<template>
  <div class="tabbar-right">
    <el-button :icon="Refresh" circle @click="refresh"></el-button>
    <el-button :icon="FullScreen" circle @click="fullscreen"></el-button>
    <el-popover placement="bottom" title="主题设置" :width="250" trigger="hover">
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            v-model="color"
            show-alpha
            :predefine="predefineColors"
            @change="setThemeColor"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="dark"
            inline-prompt
            active-icon="Moon"
            inactive-icon="Sunny"
            @change="changeDark"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button :icon="Setting" circle></el-button>
      </template>
    </el-popover>
    <img class="img" :src="userState.avatar" />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userState.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">{{ userState.username }}</el-dropdown-item>
          <el-dropdown-item command="e" divided @click="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Setting, Refresh, FullScreen } from '@element-plus/icons-vue'
import useSettingStore from '@/store/setting'
import useUserState from '@/store/modules/user/user'
import { useRoute, useRouter } from 'vue-router'
let settingStore = useSettingStore()
let userState = useUserState()
// 获取路由器对象
let $router = useRouter()
// 获取路由对象
let $route = useRoute()
// 刷新按钮回调事件
const refresh = () => {
  settingStore.isrefresh = !settingStore.isrefresh
}
// 全屏显示
const fullscreen = () => {
  // dom对象一个属性用来判断是否为全屏显示
  let el = document.fullscreenElement
  if (!el) {
    // 全屏显示
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    document.exitFullscreen()
  }
}
// 退出登录
const loginOut = async () => {
  await userState.userLogOut()
  // 跳转到登录页面 带上退出登录之前的路径
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
// 颜色管理
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
// 暗黑模式开关
const dark = ref(false)
// 暗黑模式切换的回调
const changeDark = () => {
  // 获取根元素html
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}
// 设置主题颜色
const setThemeColor = () => {
  // document.documentElement 是全局变量时
  const el = document.documentElement
  // 设置 css 变量更换颜色
  el.style.setProperty('--el-color-primary', color.value)
  el.style.setProperty('--el-color-warning', color.value)
  el.style.setProperty('--el-color-danger', color.value)
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
