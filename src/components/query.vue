<template>
  <el-form  class="search" :model="brand"  @keyup.enter="queryBrand">
    <el-form-item label="标题:">
      <el-input v-model="brand.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="价格:">
      <el-input v-model="brand.price" placeholder="价格"></el-input>
    </el-form-item>
    <el-form-item label="类型:">
      <el-input v-model="brand.type" placeholder="类型"></el-input>
    </el-form-item>
    <el-form-item label="卖家:">
      <el-input v-model="brand.seller" placeholder="卖家"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="queryBrand" >查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive } from "vue";
const emit = defineEmits(["additionChange"]);
let brand = reactive({
  title: "",
  price: "",
  type: "",
  seller: "",
});

const queryBrand = () => {
  emit("additionChange", brand);
};
</script>
<style lang="less" scoped>
.search{
  display: flex;
  justify-content: center;
  align-items:center;
  .el-form-item{
    margin: 10px 10px;
  }
}
</style>