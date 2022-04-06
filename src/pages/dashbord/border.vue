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
    <el-table-column prop="seller" label="买家" width="120" align="center" />
    <el-table-column prop="seller" label="卖家" width="120" align="center" />
    <el-table-column prop="time" label="时间" width="240" align="center" />
    <el-table-column prop="status" label="状态" width="120" align="center" />
    <el-table-column prop="right" label="操作" align="center">
      <template #default="scope">
        <el-button  size= "small" type="primary" @click="pay(scope.row)">购买</el-button>
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

const pay = (row)=>{
    router.push({ path: "/pay", query: { username: row.seller , id : row.id} });
}
const selectBuyerOrder = () =>{
  api.selectBuyerOrder({'buyer':localStorage.getItem("username")}).then((resp)=>{
    tableData.value = resp.data;
  })
}

const deleteSellerOrder = (row) =>{
    console.log(row);
    api.deleteSellerOrder(row).then((resp)=>{
      console.log(resp);
      selectBuyerOrder();
    })
}
onMounted(()=>{
  selectBuyerOrder()
})
</script>
