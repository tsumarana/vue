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
    <el-table-column prop="seller" label="卖家" width="120" align="center" />
    <el-table-column prop="time" label="时间" width="120" align="center" />
    <el-table-column prop="status" label="状态" width="120" align="center" />
    <el-table-column prop="right" label="操作" align="center">
      <template #default="scope">
        <el-button  size= "small" type="primary" @click="deleteOrder(scope.row)">下架</el-button>
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
import { ref, reactive, onMounted, getCurrentInstance ,onBeforeUnmount} from "vue";
import { useRouter } from "vue-router";

const api = getCurrentInstance().appContext.config.globalProperties.$api;
const router = useRouter();
let tableData = ref([{
  id:'',
  name:'',
  buyer:'',
  seller:'',
  time:'',
  brand_id:'',
  status:'',
}])

const selectSellerOrder = () =>{
  api.selectSellerOrder({'seller':localStorage.getItem("username")}).then((resp)=>{
    tableData.value = resp.data;
  })
}

const deleteOrder = (row) =>{
    console.log(row);
    api.deleteOrder(row).then((resp)=>{
      console.log(resp);
    })
}
onMounted(()=>{
  selectSellerOrder()
})
</script>
