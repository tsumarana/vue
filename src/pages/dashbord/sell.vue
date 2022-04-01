<template>
  <el-container>
    <el-main>
      <el-form ref="form" :model="brand" label-width="80px" class="addForm">
        <el-form-item label="标题">
          <el-input style="width: 300px" v-model="brand.title"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input style="width: 300px" v-model="brand.price"></el-input>
        </el-form-item>
        <el-form-item label="等级">
          <el-input style="width: 300px" v-model="brand.grade"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input style="width: 300px" v-model="brand.type"></el-input>
        </el-form-item>
        <el-form-item label="账号等级">
          <el-input
            style="width: 300px"
            v-model="brand.accountGrade"
          ></el-input>
        </el-form-item>
        <el-form-item label="皮肤">
          <el-input style="width: 300px" v-model="brand.decorate"></el-input>
        </el-form-item>
        <el-form-item label="段位">
          <el-input style="width: 300px" v-model="brand.rank"></el-input>
        </el-form-item>
        <el-form-item label="是否成年">
          <el-switch v-model="brand.adult"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods">上架</el-button>
          <el-button @click="$router.push('/showbrand')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const api = getCurrentInstance().appContext.config.globalProperties.$api;
let brand = reactive({
  title: "",
  price: "",
  grade: "",
  type: "",
  accountGrade: "",
  decorate: "",
  rank: "",
  adult: "",
  seller: localStorage.getItem("username"),
});
const addGoods = () => {
  api.addBrand(brand).then((resp) => {
    if (resp.data == "success") {
      ElMessage({
        message: "上架成功",
        type: "success",
      });
      router.push("/showbrand");
    }
  });
};
</script>
<style lang="less" scoped>
.addForm {
  margin-left: 700px;
  margin-top: 50px;
}
</style>
