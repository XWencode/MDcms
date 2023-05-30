<template>
  <div class="spu">
    <Category :scene="scene"></Category>
    <el-card>
      <div v-show="scene == 0">
        <el-button
          class="addbtn"
          type="primary"
          icon="plus"
          @click="addSpuHandler"
          :disabled="categoryStore.c3Id ? false : true"
          >添加SPU</el-button
        >
        <el-table :data="spuDataList" border stripe>
          <el-table-column type="index" align="center" label="序号" width="55" />
          <el-table-column label="SPU名称" prop="spuName" />
          <el-table-column label="商品描述" width="200">
            <template #default="{ row, $index }">
              <div>{{ row.description }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row, $index }">
              <el-button type="primary" size="small" icon="plus" @click="addSku(row)"></el-button>
              <el-button
                type="warning"
                size="small"
                icon="edit"
                @click="editSpuHandler(row)"
              ></el-button>
              <el-button type="info" size="small" @click="checkSkuInfo(row)"
                ><el-icon><Warning /></el-icon
              ></el-button>
              <el-popconfirm
                title="确定删除当前的spu吗?"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button type="danger" size="small" icon="delete" @click=""></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
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
            @current-change="getSpuList"
          />
        </el-config-provider>
      </div>
      <!-- 新增或修改spu -->
      <spuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></spuForm>
      <!-- 新增sku -->
      <skuForm v-show="scene == 2" @changeScene="changeScene" ref="sku"></skuForm>
    </el-card>
    <!-- 对应sku信息 -->
    <el-dialog v-model="dialogTableVisible" title="SKU列表">
      <el-table :data="skuInfoList">
        <el-table-column label="sku名字" prop="skuName" />
        <el-table-column label="sku价格" prop="price" />
        <el-table-column label="sku重量" prop="weight" />
        <el-table-column label="sku图片">
          <template #default="{ row, $index }">
            <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import skuForm from './skuForm.vue'
import spuForm from './spuForm.vue'
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { Warning } from '@element-plus/icons-vue'
// 接口
import { reqHasSpu, reqSkuInfo, reqDeleteSpu } from '@/api/product/spu/index'
// 数据类型
import type { spuValType, spuResListType, skuResType, saveSkuType } from '@/api/product/spu/type'
// 使用中文语言
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { ElMessage } from 'element-plus'
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

// 控制展示卡片与新增属性卡变的切换
let scene = ref<number>(0) //0展示列表 1新增或修改spu 2新增sku
let categoryStore = useCategoryStore()
// 当前页码数
let page = ref<number>(1)
// 每页的数据条数
let limit = ref<number>(3)
// 总数据条数
let total = ref<number>(0)
// 每个spu信息
let spuDataList = ref<any>([])
// 通过ref获取spuForm组件实例
let spu = ref()
// 通过ref获取skuForm组件实例
let sku = ref()
// 控制查看sku详情信息的对话框
const dialogTableVisible = ref(false)
// 存储sku信息
let skuInfoList = ref<saveSkuType[]>([])
watch(
  () => categoryStore.c3Id,
  () => {
    getSpuList()
  }
)
// 发请求获取spu列表信息
const getSpuList = async () => {
  let res: spuResListType = await reqHasSpu(page.value, limit.value, categoryStore.c3Id)
  if (res.code == 200) {
    total.value = res.data.total
    spuDataList.value = res.data.records
  } else {
    ElMessage.error('获取spu列表失败')
  }
}
// 改变分页器每页显示数据条数
const handleSizeChange = () => {
  getSpuList()
}
// 点击添加spu的回调
const addSpuHandler = () => {
  // 改变场景值
  scene.value = 1
  // 调用子组件spuForm的方法获取数据展示
  spu.value.getSpuData(categoryStore.c3Id)
}
// 点击修改spu图标
const editSpuHandler = (row: spuValType) => {
  // 改变场景值
  scene.value = 1
  // 调用子组件的方法获取某个spu全部信息
  spu.value.getEditSpuData(row)
}

// 点击新增sku按钮的回调
const addSku = (row: spuValType) => {
  scene.value = 2
  sku.value.getSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
// 点击查看sku信息
const checkSkuInfo = async (row: spuValType) => {
  // 打开对话框
  dialogTableVisible.value = true
  // 发请求获取sku信息
  let res: skuResType = await reqSkuInfo(row.id as number)
  if (res.code == 200) {
    skuInfoList.value = res.data
  }
}
//删除spu
const deleteSpu = async (row: spuValType) => {
  let res: any = await reqDeleteSpu(row.id as number)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    if (spuDataList.value.length > 1) {
      getSpuList()
    } else {
      // 页码大于1
      if (page.value > 1) {
        page.value -= 1
        getSpuList()
      } else {
        // y页码等于1
        page.value = 1
        getSpuList()
      }
    }
  } else {
    ElMessage.error(res.data)
  }
}

// 子组件spuForm绑定的自定义事件：子组件通知父组件切换场景
const changeScene = (num: number) => {
  scene.value = num
  // 切换场景之后更新数据展示
  getSpuList()
}
// 组件销毁的时候清除三级列表信息
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style lang="scss" scoped>
.elpagination {
  padding: 15px 0;
}
.addbtn {
  margin: 10px 0;
}
</style>
