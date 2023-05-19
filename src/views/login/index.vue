<template>
  <div class="login">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="content" :model="login_Form" :rules="rules" ref="FormRef">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="login_Form.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              show-password
              v-model="login_Form.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="el-btn" :loading="loading" type="primary" @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserState from '@/store/modules/user/user.js'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import getTime from '@/utils/time'
// 收集账号密码数据
let login_Form = reactive({ username: 'admin', password: '111111' })
// 点击登录按钮加载效果
let loading = ref(false)
let userStore = useUserState()
let $router = useRouter()
let FormRef = ref()

// 自定义校验规则函数
const validateUsername = (rlue: any, value: any, callback: any) => {
  if (value.trim().length >= 5 && value.trim().length <= 12) {
    callback()
  } else {
    callback(new Error('账号长度5到12位'))
  }
}
const validatepassword = (rlue: any, value: any, callback: any) => {
  if (/^\d{6,18}$/.test(value)) {
    callback()
  } else {
    callback(new Error('密码长度为6到18位'))
  }
}
// 表单校验
const rules = {
  username: [
    // { require: true, min: 5, max: 12, message: '长度必须为5~12位', trigger: 'change' },
    { validator: validateUsername, trigger: 'change' }
  ],
  password: [
    // { require: true, min: 6, max: 18, message: '长度必须为6~18位', trigger: 'change' },
    { validator: validatepassword, trigger: 'change' }
  ]
}

// 用户点击登录按钮事件
async function login() {
  // 保证全部表单校验通过之后才发请求
  await FormRef.value.validate()
  // 按钮进入加载状态
  loading.value = true
  userStore.userLogin(login_Form).then(
    (res) => {
      loading.value = false
      // 登录成功路由跳转
      $router.push('/home')
      // 登录成功提示信息
      ElNotification({
        type: 'success',
        title: 'Hi,' + getTime(),
        message: '欢迎回来',
        duration: 2000
      })
    },
    (err) => {
      loading.value = false
      ElNotification({
        type: 'error',
        message: err,
        duration: 2000
      })
    }
  )
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .content {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      font-size: 40px;
      color: white;
      margin-top: 10px;
    }
    h2 {
      font-size: 30px;
      color: white;
      margin: 20px 0;
    }
    .el-btn {
      width: 100%;
    }
  }
}
</style>
