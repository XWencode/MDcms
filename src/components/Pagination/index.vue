<template>
  <div class="pagenation">
    <el-config-provider :locale="locale">
      <el-pagination
        v-model:current-page="paginationData.pageNo"
        v-model:page-size="paginationData.pageSize"
        :page-sizes="[3, 5, 10]"
        background
        layout=" prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { reactive } from 'vue';
// 使用中文语言
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
// 接收父组件传过来的当前页数与每页数据条数以及总数据条数
const props = defineProps<{
  //总数据条数
  total:number,
  // 当前页数
  pageNo:number,
  // 每页数据条数
  pageSize:number
}>()
let paginationData=reactive({
  // 需要通过触发自定义事件带给父组件发送请求获取新页码对应的数据
  pageNo:props.pageNo,
  pageSize:props.pageSize,
  // 这里只父组件通过props传递一次total就行了，不需要通过触发自定义事件带给父组件
  // total:props.total
})
// 生成事件对象
const $emit = defineEmits(['change','update:pageSize','update:pageNo'])
// 改变每页数据条数
const handleSizeChange = (val: number) => {
  // 使用自定义事件实现父子组件数据同步
  $emit('update:pageSize',val)
  // 触发自定义事件获取对应当页指定条数的数据
  $emit('change',paginationData)
}
// 改变当前页数
const handleCurrentChange = (val: number) => {
  // 使用自定义事件实现父子组件数据同步
  $emit('update:pageNo',val)
  // 自定义事件获取对应页码的数据
  $emit('change',paginationData)
}
</script>

<style lang="scss" scoped>
.pagenation{
  padding: 15px 0;
}
</style>
