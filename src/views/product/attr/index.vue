<template>
  <div class="attr">
    <Category :scene="scene"></Category>
    <el-card v-if="scene == 0">
      <el-button
        class="addbtn"
        type="primary"
        icon="plus"
        @click="addAttr"
        :disabled="categoryStore.c3Id ? false : true"
        >添加平台属性</el-button
      >
      <el-table :data="attrList" border stripe>
        <el-table-column align="center" type="index" label="序号" width="55" />
        <el-table-column label="属性名称" width="200">
          <template #default="{ row, $index }">
            <pre>{{ row.attrName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="属性值名称">
          <template #default="{ row, $index }">
            <el-tag v-for="attrval in row.attrValueList" type="">{{ attrval.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template #default="{ row, $index }">
            <el-button type="warning" icon="edit" size="small" @click="editAttr(row)"></el-button>
            <el-popconfirm
              width="200"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon-color="#626AEF"
              :title="`确定删除属性${row.attrName}吗?`"
              @confirm="deleteAttr(row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger" icon="delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card v-if="scene == 1">
      <el-form :inline="true" ref="form">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名" v-model="attrParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button
        :disabled="attrParams.attrName ? false : true"
        type="primary"
        icon="plus"
        @click="addAttrValue"
        >添加属性值</el-button
      >
      <!-- <el-button>取消</el-button> -->
      <el-table :data="attrParams.attrValueList" border style="margin: 10px 0">
        <el-table-column label="序号" type="index" width="55"></el-table-column>
        <el-table-column label="属性值">
          <template #default="{ row, $index }">
            <el-input
              v-if="row.flag"
              type="text"
              :ref="(vc:any)=>inputArr[$index]=vc"
              v-model.trim="row.valueName"
              placeholder="请输入属性值"
              @blur="toLook(row, $index)"
            />
            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="attrParams.attrValueList.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="default"
        @click="saveNewAttr"
        :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >保存</el-button
      >
      <el-button size="default" @click="scene = 0">取消</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqGoodsAttrList, reqaddOrEditAttr, reqDeleteAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'
import type { attrResType, attrType, attrValType } from '@/api/product/attr/type'
import { watch, ref, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
// 控制展示卡片与新增属性卡变的切换
let scene = ref<number>(0)
// 商品属性列表数据
let attrList = ref<attrType[]>([])
// 属性对象
let attrParams = reactive<attrType>({
  attrName: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: []
})
// 存储每个属性值的input的dom实例
let inputArr = ref<any>([])
// 监听仓库三级分类id的变化
watch(
  () => categoryStore.c3Id,
  () => {
    //清空上一次查询的属性与属性值
    attrList.value = []
    // 保证三级id有才能发请求
    if (!categoryStore.c3Id) return
    // 发请求获取属性列表
    getAttrList()
  }
)
const getAttrList = async () => {
  let res: attrResType = await reqGoodsAttrList(
    categoryStore.c1Id,
    categoryStore.c2Id,
    categoryStore.c3Id
  )
  if (res.code == 200) {
    attrList.value = res.data
  }
}
// 点击添加属性的回调
const addAttr = () => {
  // 清空上一次填写的数据、并拿到三级分类的id
  Object.assign(attrParams, {
    attrName: '',
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
    attrValueList: []
  })
  scene.value = 1
}

// 添加属性值的回调
const addAttrValue = () => {
  // 添加一个空对象让用户输入值
  attrParams.attrValueList.push({
    valueName: '',
    flag: true //控制input框与div框的切换
  })
  // 每次新添加一个input框时自动聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

// 属性值input框失去焦点的回调
const toLook = (row: attrValType, $index: number) => {
  // 非法条件一:输入为空时不能切换为div
  if (row.valueName.trim() == '') {
    // 如果输入的属性值为空则删除该条属性并提示不能为空
    ElMessage({
      type: 'error',
      message: '输入的属性值不能为空'
    })
    attrParams.attrValueList.splice($index, 1)
    return
  }
  // 非法条件二:输入的属性值重复
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  // 如果有重复的删除该条属性并提示属性值已存在
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '输入的属性值已存在'
    })
    attrParams.attrValueList.splice($index, 1)
    return
  }
  // 将input切换为div
  row.flag = false
}
// 点击div的回调
const toEdit = (row: attrValType, $index: number) => {
  // 将div切换为input
  row.flag = true
  // 变为input自动获取焦点
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
// 点击保存保存新增属性
const saveNewAttr = async () => {
  let res = await reqaddOrEditAttr(attrParams)
  if (res.code == 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功'
    })
    getAttrList()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败'
    })
  }
}
// 修改属性
const editAttr = async (row: attrType) => {
  // 将数据回显到对应位置
  // 使用ES6的Object.assign方法，此方法是一个浅拷贝的方法
  // 注意：浅拷贝两个变量指向一个内存地址，修改属性值之后没有保存页会在本地改变属性值展示
  // 这里需要将row进行深拷贝一份然后与attrParams合并
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  scene.value = 1
}
// 删除属性
const deleteAttr=async(id:number)=>{
  // 发请求删除属性
  let res = await reqDeleteAttr(id)
  if(res.code==200){
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    getAttrList()
  }else{
    ElMessage.error('删除失败')
  }
}
</script>

<style lang="scss" scoped>
.addbtn {
  margin: 10px 0;
}
.el-tag {
  margin-right: 5px;
}
</style>
