<template>
  
  <div class="box">
    <query @additionChange="additionChange" />
    <el-row class="brandCard">
      <el-col
        v-for="(item) in tableData"
        :key="item"
        :span="6"
        :offset=1
        class="card"
      >
        <el-card class="brand-card">
          <img
            :src="item.img" 
            class="image"
          />
          <div>
            <span class="brand-title">{{item.title}}</span>
            <div class="bottom">
              <span class="price">价格:{{item.price}}</span>
              <el-button type="text" class="button" @click="test(item.id)">查看商品详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import query from "../components/query.vue";
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const api = getCurrentInstance().appContext.config.globalProperties.$api;

let goods = ref({ title: "", price: "", type: "", seller: "" });
let tableData = ref([
  {
    id: "",
    title: "",
    price: "",
    type: "",
    seller: "",
    img:"",
  },
]);
const test=(id)=>{
  router.push({ path: "/binfo", query: { id: id } });
}
//查询商品
function selectBrand() {
  api.selectnBrand(goods).then((resp) => {
    tableData.value = resp.data;
  });
}
//传值
function additionChange(val) {
  console.log("additionChange", val);
  goods = val;
  selectBrand();
}
onMounted(() => {
  selectBrand();
});
</script>
<style lang='less' scoped>
.box{
  width: 100%;
  height: 100%;
}
.brandCard{
  width: 100%;
  display: flex;
 
  .card{
    display: flex;
    margin-top: 10px;
    .brand-card{
      width: 100%;
      margin: 10px 10px;
    }
    .image {
      width: 100%;
      height: 300px;
      display: flex;
      flex: 1;
    }
    
    .bottom {
      height: 20px;
      margin-top: 12px;
      line-height: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap:nowrap;
      .price{
        display: flex;
        justify-content:center
      }
}
  }
}
</style>
