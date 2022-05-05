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
    <el-table-column prop="count" label="数量" width="120" align="center" />
    
    <el-table-column  label="更改商品数量" width="120">
      <template #default="scope">
        <el-button size ="small" @click="decrease(scope.row)">-</el-button>
        <el-button size ="small" @click="increase(scope.row)">+</el-button>
        </template>
      </el-table-column>
    <el-table-column prop="right" label="操作" align="center">
      <template #default="scope">
        <el-button type="text" size="small" @click="deleteTrolley(scope.row)">
          删除
        </el-button>
        <el-button type = "error" size="small" @click="pay(scope.row)">购买</el-button>
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
  brandId:'',
  price:'',
  count:'',
  seller:'',
  img:'',
}])
const pay = (row)=>{
  deleteTrolley(row);
  api.selectBrandById({id:row.brandId}).then((resp)=>{
    resp.data.username = localStorage.getItem("username")
    api.addBOrder(resp.data).then((resp)=>{
      router.push({ path: "/pay", query: {username: row.seller , id:resp.data.id } });
  })
  })
  //  router.push({ path: "/pay", query: { username: row.seller , id : row.id} });
}
const decrease = (row)=>{
    if(row.count <= 1){
      return ;
    }else{
      row.count--;
    }
}
const increase = (row)=>{
    row.count++
}
const deleteTrolley=(row)=>{
    api.deleteTrolley(row).then((resp)=>{
      selectTrolley();
    })
}
const selectTrolley=()=>{
    api.selectTrolley({username:localStorage.getItem("username")}).then((resp)=>{
          tableData.value = resp.data;
    })
}

onBeforeUnmount(()=>{
  api.saveCount(tableData.value)
})
onMounted(()=>{
  selectTrolley()
})
</script>
