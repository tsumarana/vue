<template>
  <el-table :data="tableData" style="width: 100%" max-height="700">
    <el-table-column
      fixed
      prop="name"
      label="商品名"
      width="400"
      align="center"
    />
    <el-table-column prop="price" label="价格" width="120" align="center" />
    <el-table-column prop="count" label="数量"  align="center" />
    <el-table-column  label="更改商品数量" width="120">
        <el-button size ="small">-</el-button>
        <el-button size ="small">+</el-button>
    </el-table-column>
    <el-table-column prop="right" label="操作" align="center">
      <template #default="scope">
        <el-button type="text" size="small" @click="selectInfo(scope.row)">
          删除
        </el-button>
        <el-button type = "error" size="small">购买</el-button>
      </template>
    </el-table-column>
  </el-table>
  <pagination
    ref="pagination1"
    :totalCount="totalCount"
    @currentPageChange="currentPageChange"
    @pageSizeChange="pageSizeChange"
  ></pagination>
</template>
<script setup>
import pagination from "../../components/pagination.vue";
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

const api = getCurrentInstance().appContext.config.globalProperties.$api;
const router = useRouter();
let tableData = ref([{
  id:'',
  name:'',
  brandId:'',
  price:'',
  count:'',
}])
const selectTrolley=()=>{
    api.selectTrolley({username:localStorage.getItem("username")}).then((resp)=>{
          tableData.value = resp.data;
    })
}
onMounted(()=>{
  selectTrolley()
})
</script>
