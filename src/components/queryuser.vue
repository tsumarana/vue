<template>
  <el-form :inline="true" :model="user" class="demo-form-inline" @keyup.enter="queryUser">
    <el-form-item label="用户名">
      <el-input v-model="user.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="user.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item label="身份证">
      <el-input v-model="user.idCard" placeholder="身份证"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="user.name" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="queryUser" >查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive } from "vue";
const emit = defineEmits(["additionChange"]);
let user = reactive({
  username: "",
  email: "",
  idCard: "",
  name: "",
});

const queryUser = () => {
  console.log(user);
  emit("additionChange", user);
};
</script>
