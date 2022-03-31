<template>
  <query @additionChange="additionChange" />
  <el-table :data="tableData" style="width: 100%" max-height="700">
    <el-table-column
      fixed
      prop="title"
      label="标题"
      width="400"
      align="center"
    />
    <el-table-column prop="price" label="价格" width="120" align="center" />
    <el-table-column prop="type" label="类型" width="120" align="center" />
    <el-table-column prop="seller" label="卖家" width="120" align="center" />
    <el-table-column prop="right" label="操作" align="center">
      <template #default="scope">
        <el-button type="text" size="small" @click="selectInfo(scope.row)">
          查看商品详情
        </el-button>
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
import query from "../components/query.vue";
import pagination from "../components/pagination.vue";
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";


const { needCheck } = defineProps({
  needCheck:String
});



const router = useRouter();
const api = getCurrentInstance().appContext.config.globalProperties.$api;

let pageSize = 20;
let currentPage = 1;
let totalCount = ref(300);
let url =
  "/api/goods/selectByPageAndCondition?currentPage=" +
  currentPage +
  "&pageSize=" +
  pageSize;
let brand = ref({ title: "", price: "", type: "", seller: "" });
let tableData = ref([
  {
    id: "1",
    title: "大甩卖",
    price: "1100",
    type: "账号",
    seller: "Los Angeles",
  },
]);

//查看商品详情
const selectInfo = (row) => {
  console.log(row.id);
  router.push({ path: "/binfo", query: { id: row.id } });
};

//查询商品
function selectBrand() {
  console.log(needCheck)
  console.log("selectBrand ....");
  api.selectBrand(url, brand).then((resp) => {
    console.log(resp.data);
    tableData.value = resp.data.rows;
    totalCount.value = resp.data.totalCount;
  });
}
//传值
function currentPageChange(val) {
  console.log("currentPageChange", val);
  currentPage = val;
  url =
    "api/goods/selectByPageAndCondition?currentPage=" +
    currentPage +
    "&pageSize=" +
    pageSize;
  selectBrand();
}
function pageSizeChange(val) {
  console.log("pageSizeChange", val);
  pageSize = val;
  url =
    "api/goods/selectByPageAndCondition?currentPage=" +
    currentPage +
    "&pageSize=" +
    pageSize;
  selectBrand();
}
function additionChange(val) {
  console.log("additionChange", val);
  brand = val;
}
onMounted(() => {
  selectBrand();
});
</script>
