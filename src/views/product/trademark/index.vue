<template>
  <div class="trademark">
    <el-card>
      <el-button class="addbtn" icon="plus" type="primary" @click="addTrademark"
        >添加品牌</el-button
      >
      <!-- 商品品牌表格 -->
      <el-table :data="trademarkList" border stripe>
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column label="品牌名称">
          <template #default="{ row, $index }">
            <pre>{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #default="{ row, $index }">
            <img :src="row.logoUrl" alt="图片丢失了" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row, $index }">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="updateTrademark(row)"
            ></el-button>
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon-color="#626AEF"
              :title="`确定删除品牌${row.tmName}吗?`"
              @confirm="deleteTrademark(row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger" icon="delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-config-provider :locale="locale">
        <el-pagination
          class="elpagination"
          v-model:current-page="page"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 10]"
          background
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="getTrademarkList"
        />
      </el-config-provider>
    </el-card>
    <el-dialog v-model="dialogFormVisible" :title="trademark.id ? '修改品牌' : '添加品牌'">
      <el-form :model="trademark" :rules="rules" ref="FormRef">
        <el-form-item label="品牌名称" prop="tmName" label-width="100px">
          <el-input v-model="trademark.tmName" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl" label-width="100px">
          <!-- action：上传图片代理的服务器路径，必须带上/api负责代理服务器不发送post请求 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademark.logoUrl" :src="trademark.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="canceladdTrademark">取消</el-button>
          <el-button type="primary" @click="confirmaddTrademark">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reqTrademarkList, reqAddTrademark, reqDeleteTrademark } from '@/api/product/index'
import { onMounted, computed, reactive, ref, nextTick } from 'vue'
import type { Records, trademarkresType, TradeMarkType } from '@/api/product/type'
import type { UploadProps } from 'element-plus'
import type { FormRules } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
// 使用中文语言
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
let trademarkList = ref<Records>([])
// 当前页码数
let page = ref<number>(1)
// 每页的数据条数
let limit = ref<number>(3)
// 总数据条数
let total = ref<number>(0)
onMounted(() => {
  getTrademarkList()
})

//添加品牌
let dialogFormVisible = ref<boolean>(false)
// 收集用户填写的名称和图片
let trademark = reactive<TradeMarkType>({
  tmName: '',
  logoUrl: ''
})
//获取el-form组件实例
let FormRef = ref()

// 添加品牌表单效验
// 品牌名称自定义校验规则
const validatePasstmName = (rules: any, value: any, callBack) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称最少两个字'))
  }
}
// 品牌logo自定义效验规则
const validatePasslogoUrl = (rules: any, value: any, callBack) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('品牌logo必须有'))
  }
}
const rules = reactive<FormRules>({
  tmName: [{ required: true, validator: validatePasstmName, trigger: 'blur' }],
  logoUrl: [{ required: true, validator: validatePasslogoUrl, trigger: 'blur' }]
})
// 添加品牌的回调
const addTrademark = () => {
  // 清空填写的未保存的数据
  trademark.tmName = ''
  trademark.logoUrl = ''
  delete trademark.id
  // 清除表单验证
  //第一种写法:ts的问号语法
  // formRef.value?.clearValidate('tmName');
  // formRef.value?.clearValidate('logoUrl');
  // 第二种写法
  nextTick(() => {
    FormRef.value.clearValidate('tmName')
    FormRef.value.clearValidate('logoUrl')
  })
  // 打开对话框
  dialogFormVisible.value = true
}
// 修改品牌的回调
const updateTrademark = (row: TradeMarkType) => {
  nextTick(() => {
    FormRef.value.clearValidate('tmName')
    FormRef.value.clearValidate('logoUrl')
  })
  // trademark.id = row.id
  // trademark.logoUrl = row.logoUrl
  // trademark.tmName = row.tmName
  // 使用ES6语法合并对象(一行代码解决三行)
  Object.assign(trademark, row)
  // 打开对话框
  dialogFormVisible.value = true
}
// 取消增加或修改的回调
const canceladdTrademark = () => {

  dialogFormVisible.value = false
}
// 确定增加或者修改
const confirmaddTrademark = async () => {
  //在你发请求之前,要对于整个表单进行校验
  //调用这个方法进行全部表单相校验,如果校验全部通过，在执行后面的语法
  await FormRef.value.validate()
  let res: any = await reqAddTrademark(trademark)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: trademark.id ? '修改品牌成功' : '添加品牌成功'
    })
    // 关闭对话框
    dialogFormVisible.value = false
    // 重新发请求获取最新列表
    getTrademarkList(page.value)
  } else {
    ElMessage({
      type: 'error',
      message: trademark.id ? '修改品牌失败' : '添加品牌失败'
    })
  }
}
// 删除品牌信息
const deleteTrademark = async (id) => {
  let res: any = await reqDeleteTrademark(id)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
      getTrademarkList(trademarkList.value.length>1 ? page.value:page.value- 1)
  }
}
// 图片上传成功的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  // response为上传图片服务器返回的数据
  // uploadFile:服务器返回的图片相关信息
  // 收集服务器返回的图片地址，添加品牌的时候带给服务器
  trademark.logoUrl = response.data
  //图片上传成功,清除掉对应图片校验结果
  FormRef.value.clearValidate('logoUrl')
}

// 上传图片的校验
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // rawFile当前上传文件的对象
  if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
    return true
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('图片大小不能超过4MB!')
    return false
  } else {
    return false
  }
}

// 创建一个获取已有的品牌数据
const getTrademarkList = async (pager = 1) => {
  page.value = pager
  // 发请求获取品牌数据
  let res: trademarkresType = await reqTrademarkList(page.value, limit.value)
  if (res.code == 200) {
    total.value = res.data.total
    trademarkList.value = res.data.records
  }
}
// 每页数据条数发发生变化时的回调
const handleSizeChange = () => {
  getTrademarkList()
}
</script>

<style lang="scss" scoped>
.elpagination {
  padding: 15px 0;
}
.addbtn {
  margin: 10px 0;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
