<template>
  <div>
    <el-table :data="skuDataList" border>
      <el-table-column type="index" label="序号" width="80px" align="center" />
      <el-table-column show-overflow-tooltip label="名称" width="200px">
        <template #default="{ row, $index }">
          <div style="white-space: pre-wrap">{{ row.skuName }}</div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="描述" width="200px">
        <template #default="{ row, $index }">
          <div style="white-space: pre-wrap">{{ row.skuDesc }}</div>
        </template>
      </el-table-column>
      <el-table-column label="默认图片" width="200px">
        <template #default="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量" prop="weight" width="200px" />
      <el-table-column label="价格" prop="price" width="200px" />
      <el-table-column label="操作" align="center" fixed="right" width="300px">
        <template #default="{ row, $index }">
          <el-button
            :type="row.isSale == 1 ? 'success' : 'info'"
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="uploadOrdownload(row)"
          ></el-button>
          <el-button type="primary" icon="edit" size="small" @click="editSku"></el-button>
          <el-button type="info" size="small" @click="checkSkuInfo(row)">
            <el-icon><InfoFilled /></el-icon>
          </el-button>
          <el-popconfirm
            title="确定删除该商品吗?"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="deleteSkuInfo(row)"
          >
            <template #reference>
              <el-button type="danger" icon="delete" size="small"></el-button>
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
        @current-change="getSkuList"
      />
    </el-config-provider>
    <el-drawer v-model="drawer" title="查看商品详情">
      <div class="sku">
        <div class="skuInfo">
          <div class="title">名称</div>
          <div class="info">{{ skuInfo.skuName }}</div>
        </div>
        <div class="skuInfo">
          <div class="title">描述</div>
          <div class="info">{{ skuInfo.skuDesc }}</div>
        </div>
        <div class="skuInfo">
          <div class="title">价格</div>
          <div class="info">{{ skuInfo.price }}</div>
        </div>
        <div class="skuInfo">
          <div class="title">平台属性</div>
          <div class="info">
            <el-tag
              style="margin-left: 5px"
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              >{{ item.valueName }}</el-tag
            >
          </div>
        </div>
        <div class="skuInfo">
          <div class="title">销售属性</div>
          <div class="info">
            <el-tag
              style="margin-left: 5px"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              >{{ item.saleAttrValueName }}</el-tag
            >
          </div>
        </div>
        <div class="skuInfo">
          <div class="title">商品图片</div>
          <div class="info">
            <el-carousel :interval="4000" type="card">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" style="width: 300px; height: 200px" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue'
import {
  reqSkuList,
  reqCancelSale,
  reqOnSale,
  reqSkuInfo,
  reqDeleteSku
} from '@/api/product/sku/index'
import type { skuDataListResType, skuDataType, skuInfoResType } from '@/api/product/sku/type'
// 使用中文语言
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { ElMessage } from 'element-plus'
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
// 当前页码数
let page = ref<number>(1)
// 每页的数据条数
let limit = ref<number>(10)
// 总数据条数
let total = ref<number>(0)
// 抽屉的显示与隐藏
const drawer = ref(false)
// 存储sku列表信息
let skuDataList = ref<skuDataType[]>([])
// 存储某个sku信息
let skuInfo = ref<skuDataType>({})
onMounted(() => {
  getSkuList()
})
// 获取sku列表信息
const getSkuList = async (pager = 1) => {
  page.value = pager
  let res: skuDataListResType = await reqSkuList(page.value, limit.value)
  if (res.code == 200) {
    skuDataList.value = res.data.records
    total.value = res.data.total
  }
}

// 点击上架或者下架商品
const uploadOrdownload = async (row: skuDataType) => {
  // 如果isSale==1代表正在上架状态,row.isSale==0代表下架状态
  if (row.isSale == 1) {
    await reqCancelSale(row.id as number)
    ElMessage({
      type: 'success',
      message: '下架成功'
    })
    getSkuList(page.value)
  } else {
    await reqOnSale(row.id as number)
    ElMessage({
      type: 'success',
      message: '上架成功'
    })
    getSkuList(page.value)
  }
}
// 点击编辑按钮的回调
const editSku = () => {
  ElMessage({
    type: 'success',
    message: '程序员正在开发中.....'
  })
}
// 点击查看详情的按钮
const checkSkuInfo = async (row: skuDataType) => {
  drawer.value = true
  let res: skuInfoResType = await reqSkuInfo(row.id as number)
  if (res.code == 200) {
    skuInfo.value = res.data
  }
}
// 删除sku
const deleteSkuInfo = async (row: skuDataType) => {
  let res: any = await reqDeleteSku(row.id as number)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getSkuList(skuDataList.value.length > 1 ? page.value : page.value - 1)
  } else {
    ElMessage.error('删除失败')
  }
}

// 改变一页显示最大条数重新发请求
const handleSizeChange = () => {
  getSkuList()
}
</script>

<style lang="scss" scoped>
.elpagination {
  margin-top: 10px;
}
.sku {
  margin: 5px 0;
  .skuInfo {
    display: flex;
    // align-items: center;
    margin-top: 15px;
    .title {
      flex: 1;
      font-weight: 700;
    }
    .info {
      flex: 5;
    }
  }
}
</style>
