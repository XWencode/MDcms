<template>
  <div>
    <el-form label-width="100px" :inline="false" size="normal">
      <el-form-item label="spu名称" size="normal">
        <el-input placeholder="请输入SPU名称" v-model="spuInfo.spuName" @change=""></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="spuInfo.tmId"  placeholder="请选择SPU品牌" filterable @change="">
          <el-option
            v-for="tm in allTrademarkList"
            :key="tm.id"
            :label="tm.tmName"
            :value="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spuInfo.description" type="textarea" placeholder="请你输入spu描述" />
      </el-form-item>
      <el-form-item label="SPU照片">
        <el-upload
          v-model:file-list="spuImageList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="handlerUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select
          v-model="saleAttrIdAndName"
          :placeholder="`还有${unSelectSaleAttr.length}个未选择`"
        >
          <el-option
            v-for="attr in unSelectSaleAttr"
            :label="attr.name"
            :key="attr.id"
            :value="`${attr.id}:${attr.name}`"
          ></el-option>
        </el-select>
        <el-button
          style="margin-left: 15px"
          type="primary"
          icon="plus"
          :disabled="saleAttrIdAndName ? false : true"
          @click="addSaleAttrValueHandler"
          >添加销售属性值</el-button
        >
        <el-table :data="saleAttrList" style="margin: 10px 0" border>
          <el-table-column label="序号" align="center" type="index" width="55" />
          <el-table-column label="属性名" prop="saleAttrName" width="150" />
          <el-table-column label="属性值">
            <template #default="{ row, $idnex }">
              <el-tag
                v-for="(sav, index) in row.spuSaleAttrValueList"
                :key="row.id"
                class="mx-1"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ sav.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.flag"
                ref="InputRef"
                v-model="row.saleAttrValueName"
                class="ml-1 w-20"
                size="small"
                style="width: 100px"
                @keyup.enter="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              />
              <el-button
                v-else
                class="button-new-tag ml-1"
                icon="plus"
                size="small"
                @click="showInput(row)"
              >
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="{ row, $index }">
              <el-button
                type="danger"
                icon="delete"
                size="small"
                @click="saleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="saveSpu"
          :disabled="saleAttrList.length > 0 ? false : true"
          >保存</el-button
        >
        <el-button @click="cancelAddOrEditspu">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, reactive, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElInput, ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
// 请求数据函数
import {
  reqSpuTradeMark,
  reqSpuImage,
  reqSpuSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu
} from '@/api/product/spu/index'
import type {
  spuValType,
  TradeMarkType,
  spuImageType,
  allSaleAttrType,
  saleAttrType,
  spuTradeMarkResType,
  spuImageListResType,
  saleAttrResType,
  allSaleAttrListType
} from '@/api/product/spu/type'
// 接收父组件传递的数据
const emit = defineEmits(['changeScene'])
// 整个spu品牌列表
let allTrademarkList = ref<TradeMarkType[]>([])
// 全部spu售卖商品图片数据
let spuImageList = ref<spuImageType[]>([])
// 全部spu销售属性列表数据
let allSaleAttrList = ref<allSaleAttrType[]>([])
// 获取已有的销售属性以及属性值列表
let saleAttrList = ref<saleAttrType[]>([])
// 收集要保存的spu相关参数信息
let spuInfo = ref<spuValType>({
  category3Id: '',
  description: '',
  spuImageList: [],
  spuName: '',
  spuPosterList: null,
  spuSaleAttrList: [],
  tmId: ''
})
//定义一个变量来存储选中的属性id和名字
let saleAttrIdAndName = ref<string>('')

// 获取整个spu的数据(在父组件中调用执行)
const getSpuData = async (c3Id: number) => {
  // 清空上一次填写未保存的数据
  Object.assign(spuInfo.value, {
    category3Id: '',
    description: '',
    spuImageList: [],
    spuName: '',
    spuPosterList: null,
    spuSaleAttrList: [],
    tmId: ''
  })
  // 清空照片墙
  spuImageList.value = []
  // 清空商品属性
  saleAttrList.value = []
  saleAttrIdAndName.value = ''
  // 清除存在用户点完编辑spu之后没保存然后点击新增spu时id被保存在spuInfo中了
  delete spuInfo.value.id

  spuInfo.value.category3Id = c3Id
  // 获取spu品牌的请求
  let trademarkRes: spuTradeMarkResType = await reqSpuTradeMark()
  if (trademarkRes.code == 200) {
    allTrademarkList.value = trademarkRes.data
  }
  // 获取销售属性的请求
  let saleAttrRes: allSaleAttrListType = await reqAllSaleAttr()
  if (saleAttrRes.code == 200) {
    allSaleAttrList.value = saleAttrRes.data
  }
}
// 点击修改spu的回调
const getEditSpuData = async (spu: spuValType) => {
  spuInfo.value = spu
  // 获取spu品牌的请求
  let trademarkRes: spuTradeMarkResType = await reqSpuTradeMark()
  if (trademarkRes.code == 200) {
    allTrademarkList.value = trademarkRes.data
  }
  // 获取图片列表
  let imgRes: spuImageListResType = await reqSpuImage(spu.id as number)

  if (imgRes.code == 200) {
    spuImageList.value = imgRes.data.map((item) => {
      return {
        name: item.imgName,
        url: item.imgUrl
      }
    })
  }
  // 获取销售属性的请求
  let saleAttrRes: allSaleAttrListType = await reqAllSaleAttr()
  if (saleAttrRes.code == 200) {
    allSaleAttrList.value = saleAttrRes.data
  }
  // 获取销售属性的请求
  let saleAttrValueRes: saleAttrResType = await reqSpuSaleAttr(spu.id as number)
  if (saleAttrValueRes.code == 200) {
    saleAttrList.value = saleAttrValueRes.data
  }
}
// 将方法暴露出去
defineExpose({ getSpuData, getEditSpuData })

// 照片墙
const dialogImageUrl = ref<string>('')
const dialogVisible = ref(false)
// 移除图片之前的钩子
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
// 预览图片
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
// 上传图片之前的钩子
const handlerUpload = (file: any) => {
  if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件务必小于3M'
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必PNG|JPG|GIF'
    })
    return false
  }
}
// 计算出还未拥有的属性
let unSelectSaleAttr = computed(() => {
  let unselectAttr = allSaleAttrList.value.filter((item1) => {
    return saleAttrList.value.every((item2) => item1.name != item2.saleAttrName)
  })
  return unselectAttr
})
// 点击添加销售属性值的回调
const addSaleAttrValueHandler = () => {
  // 收集某一个销售属性的信息
  let saleAttr: saleAttrType = {
    baseSaleAttrId: +saleAttrIdAndName.value.split(':')[0],
    saleAttrName: saleAttrIdAndName.value.split(':')[1],
    spuSaleAttrValueList: []
  }
  saleAttrList.value.push(saleAttr)
  // 清空收集的数据
  saleAttrIdAndName.value = ''
}

// 表格中的属性值选项
const InputRef = ref<InstanceType<typeof ElInput>>()

//切换为input框
const showInput = (row: saleAttrType) => {
  row.flag = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
// 确认添加属性值的回调
const handleInputConfirm = (row: saleAttrType) => {
  let { baseSaleAttrId, saleAttrValueName } = row
  // 收集属性id与属性值
  let attrValueObj = {
    baseSaleAttrId: baseSaleAttrId,
    saleAttrValueName: saleAttrValueName as string
  }
  // 排除非法情况
  if ((saleAttrValueName as string).trim() == '') {
    ElMessage.error('输入的属性值不能为空')
    return
  }
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValueName
  })
  if (repeat) {
    ElMessage.error('输入的属性值重复,请重新输入')
    return
  }
  row.spuSaleAttrValueList.push(attrValueObj)
  // 切换回tag
  row.flag = false
  // 清空上一次填写的数据
  row.saleAttrValueName = ''
}
// 点击保存按钮的回调
const saveSpu = async () => {
  // 整理参数发请求
  spuInfo.value.spuImageList = spuImageList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url
    }
  })
  spuInfo.value.spuSaleAttrList = saleAttrList.value
  let res: any = await reqAddOrUpdateSpu(spuInfo.value)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: spuInfo.value.id ? '修改成功' : '添加成功'
    })
    // 跟换场景
    emit('changeScene', 0)
  } else {
    ElMessage({
      type: 'error',
      message: spuInfo.value.id ? '修改失败' : '添加失败'
    })
  }
  // console.log(spuInfo);
}
// 点击取消按钮的回调
const cancelAddOrEditspu = () => {
  emit('changeScene', 0)
}
</script>

<style lang="scss" scoped></style>
