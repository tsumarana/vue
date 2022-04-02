<template>
  <queryUser @additionChange="additionChange" />
  <el-table :data="tableData" style="width: 100%" max-height="800">
    <el-table-column prop="username" label="用户名" width="180" align="center">
    </el-table-column>
    <el-table-column prop="email" label="邮箱" width="180" align="center">
    </el-table-column>
    <el-table-column prop="phone" label="电话" width="180" align="center">
    </el-table-column>
    <el-table-column prop="idCard" label="身份证" width="180" align="center">
    </el-table-column>
    <el-table-column prop="name" label="姓名" align="center"> </el-table-column>
    <el-table-column  label="操作" align="center">
      <el-button size = "small"> 冻结 </el-button> 
      <el-button size = "small"> 注销</el-button> 
      </el-table-column>
  </el-table>
  <pagination
    :totalCount="totalCount"
    @currentPageChange="currentPageChange"
    @pageSizeChange="pageSizeChange"
  />
</template>
<script setup>
import queryUser from "../components/queryuser.vue";
import pagination from "./pagination.vue";
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
let pageSize = 20;
let currentPage = 1;
let totalCount = ref(200);
let url =
  "/api/user/selectUserByPage?currentPage=" +
  currentPage +
  "&pageSize=" +
  pageSize;
const api = getCurrentInstance().appContext.config.globalProperties.$api;

let tableData = ref([
  {
    username: "",
    email: "",
    phone: "",
    idCard: "",
    name: "",
  },
]);
let user = ref({
  username: "",
  email: "",
  idCard: "",
  name: "",
});
function selectUser() {
  console.log("select user.....");
  api.selectUser(url, user.value).then((resp) => {
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
    "api/user/selectUserByPage?currentPage=" +
    currentPage +
    "&pageSize=" +
    pageSize;
  selectUser();
}
function pageSizeChange(val) {
  console.log("pageSizeChange", val);
  pageSize = val;
  url =
    "api/user/selectUserByPage?currentPage=" +
    currentPage +
    "&pageSize=" +
    pageSize;
  selectUser();
}
function additionChange(val) {
  console.log("additionChange", val);
  user.value = val;
  selectUser();
}
onMounted(() => {
  selectUser();
});
</script>
