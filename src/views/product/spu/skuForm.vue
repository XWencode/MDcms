<template>
  <div>
    <el-form size="normal">
      <el-form-item label="sku名称">
        <el-input v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input v-model="skuInfo.weight" type="number"></el-input>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="skuInfo.skuDesc" type="textarea" placeholder="请你输入sku描述" />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item v-for="(attr, index) in attrList" :key="attr.id" :label="attr.attrName">
            <el-select v-model="attr.attrIdAndAttrValueId" placeholder="请选择">
              <el-option
                v-for="attrval in attr.attrValueList"
                :key="attrval.id"
                :label="attrval.valueName"
                :value="`${attr.id}:${attrval.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性" size="normal">
        <el-form :inline="true">
          <el-form-item
            v-for="saleAttr in saleAttrList"
            :key="saleAttr.id"
            :label="saleAttr.saleAttrName"
          >
            <el-select v-model="saleAttr.saleAttrIdAndSaleAttrValId" placeholder="请选择">
              <el-option
                v-for="saleAttrVal in saleAttr.spuSaleAttrValueList"
                :label="saleAttrVal.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrVal.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称" size="normal">
        <el-table ref="table" :data="spuImageList" border>
          <el-table-column type="selection" width="55" />
          <el-table-column label="图片">
            <template #default="{ row, $index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row, $index }">
              <el-button type="primary" icon="edit" @click="setIscheck(row)">设为默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="savaSkuInfo">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reqGoodsAttrList } from '@/api/product/attr/index'
import { reqSpuSaleAttr, reqSpuImage, reqAddSku } from '@/api/product/spu/index'
import type { attrResType, attrType } from '@/api/product/attr/type'
import type {
  spuValType,
  saleAttrResType,
  spuImageListResType,
  saleAttrType,
  spuImageType,
  saveSkuType
} from '@/api/product/spu/type'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
let emit = defineEmits(['changeScene'])
// 平台属性列表
let attrList = ref<attrType[]>([])
// 销售属性列表
let saleAttrList = ref<saleAttrType[]>([])
// spu图片列表
let spuImageList = ref<spuImageType[]>([])
// 收集用户填写的sku数据，到时候发请求保存sku
let skuInfo = reactive<saveSkuType>({
  // 父组件传过来收集
  category3Id: '',
  skuName: '',
  spuId: '',
  tmId: '',
  // v-model收集
  price: '',
  weight: '',
  skuDesc: '',
  skuDefaultImg: '',
  // 将选中的数据收集并挂载到数组中每个对象的自身，收集完到时候统一处理再带给服务器
  skuAttrValueList: [],
  skuSaleAttrValueList: []
})
// el-table表格的实例
let table = ref<any>()
// 添加sku的时候初始化数据，拿到平台属性，销售属性以及sku图片信息
const getSkuData = async (c1Id: number | string, c2Id: number | string, spu: spuValType) => {
  // 清除上一次填写未保存的信息
  Object.assign(skuInfo, {
    category3Id: '',
    skuName: '',
    spuId: '',
    tmId: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuDefaultImg: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: []
  })
  // 收集部分数据
  skuInfo.category3Id = spu.category3Id
  skuInfo.spuId = spu.id as number
  skuInfo.tmId = spu.tmId
  // 获取平台属性数据
  let attrRes: attrResType = await reqGoodsAttrList(c1Id, c2Id, spu.category3Id)
  if (attrRes.code == 200) {
    attrList.value = attrRes.data
  }
  // 获取销售属性列表
  let saleAttrRes: saleAttrResType = await reqSpuSaleAttr(spu.id as number)
  if (saleAttrRes.code == 200) {
    saleAttrList.value = saleAttrRes.data
  }
  // 获取spu图片列表数据
  let spuImageListRes: spuImageListResType = await reqSpuImage(spu.id as number)
  if (spuImageListRes.code == 200) {
    spuImageList.value = spuImageListRes.data
  }
}
// 对外暴露这个方法供父组件调用
defineExpose({ getSkuData })
// 点击设置默认图片的回调
const setIscheck = (row: any) => {
  // 收集默认图片地址
  skuInfo.skuDefaultImg = row.imgUrl
  // 其他勾选取消,将勾选框勾选上
  spuImageList.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  })
  table.value.toggleRowSelection(row, true)
}
// 点击保存按钮的回调
const savaSkuInfo = async () => {
  // 整理参数发请求
  // 整理平台属性列表数据
  /* attrList.value.forEach((item:attrType)=>{
    if(item.attrIdAndAttrValueId){
      skuInfo.skuAttrValueList.push({
        attrId: item.attrIdAndAttrValueId.split(':')[0],
        valueId: item.attrIdAndAttrValueId.split(':')[1]
      })
    }
  }) */
  // 另一种写法
  skuInfo.skuAttrValueList = attrList.value.reduce((prev: any, next: attrType) => {
    if (next.attrIdAndAttrValueId) {
      let [attrId, valueId] = next.attrIdAndAttrValueId.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])
  // 整理销售属性列表数据
  /* saleAttrList.value.forEach((item:saleAttrType)=>{
    if(item.saleAttrIdAndSaleAttrValId){
      skuInfo.skuSaleAttrValueList.push({
        saleAttrId: item.saleAttrIdAndSaleAttrValId.split(':')[0],
        saleAttrValueId: item.saleAttrIdAndSaleAttrValId.split(':')[1],
      })
    }
  }) */
  // 同样换一种写法
  skuInfo.skuSaleAttrValueList = saleAttrList.value.reduce((prev: any, next: saleAttrType) => {
    if (next.saleAttrIdAndSaleAttrValId) {
      let [saleAttrId, saleAttrValueId] = next.saleAttrIdAndSaleAttrValId.split(':')
      prev.push({ saleAttrId, saleAttrValueId })
    }
    return prev
  }, [])
  let res: any = await reqAddSku(skuInfo)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加sku成功'
    })
  } else {
    ElMessage.error('添加失败')
  }
  // 添加成功切换场景
  emit('changeScene', 0)
}
// 点击取消按钮的回调
const cancel = () => {
  emit('changeScene', 0)
}
</script>

<style lang="scss" scoped></style>
