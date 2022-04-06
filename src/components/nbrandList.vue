<template>
  <query @additionChange="additionChange" />
  <el-row class="brandCard">
    <el-col
       v-for="(item) in tableData"
      :key="item"
      :span="6"
       :offset=1
    >
      <el-card :body-style="{ padding: '0px' }">
        <img
          :src="item.img" 
          class="image"
        />
        <div style="padding: 14px">
          <span>{{item.title}}</span>
          
          <div class="bottom">
            <span>价格:{{item.price}}</span>
            <el-button type="text" class="button" @click="test(item.id)">查看商品详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>

  </el-row>
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
<style >
.el-card.is-always-shadow {
    width: 500px;
}
.brandCard{
  width: 100%;
  height: 100%;
}
.bottom {
  margin-top: 12px;
  line-height: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 500px;
  height: 280px;
  display: block;
}
</style>
