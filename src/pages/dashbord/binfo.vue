<template>
  <el-container>
    <el-aside width="500px">
      <img :src="info.img" class="image" />
    </el-aside>
    <el-main>
      <el-descriptions
        direction="vertical"
        :title="info.title"
        :column="1"
        :size="size"
        border
      >
        <el-descriptions-item label="价格">{{
          info.price
        }}</el-descriptions-item>
        <el-descriptions-item label="等级">{{
          info.grade
        }}</el-descriptions-item>
        <el-descriptions-item label="类型" :span="2">{{
          info.type
        }}</el-descriptions-item>
        <el-descriptions-item label="游戏等级">
          {{ info.accountGrade }}
        </el-descriptions-item>
        <el-descriptions-item label="皮肤"
          >{{ info.decorate }}
        </el-descriptions-item>
        <el-descriptions-item label="是否有防沉迷"
          >{{ info.adult }}
        </el-descriptions-item>
        <el-descriptions-item label="卖家">
          {{ info.seller }}</el-descriptions-item
        >
      </el-descriptions>
    </el-main>
    <el-aside width="700px">
      <div class="userinfo">
        <el-descriptions title="" column="1">
          <el-descriptions-item label="卖家信誉">新用户</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="tips">
        <p style="font-size: 35px">温馨提示</p>
        请在监护先进行购买
      </div>
      <div class="buy">
        <el-button type="primary" @click="pay()">购买</el-button>
        <el-button type="primary" @click="addTrolley()">添加到购物车</el-button>
        <!-- <el-button type="primary" @click="pay()">与商家联系</el-button> -->
        <el-button @click="$router.push('/chat')">联系客服</el-button>
        
      </div>
    </el-aside>
  </el-container>
</template>
<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
const api = getCurrentInstance().appContext.config.globalProperties.$api;
const router = useRouter();
const route = useRoute();

let info = ref({
  id: "",
  title: "",
  price: "",
  grade: "",
  type: "",
  accountGrade: "",
  decorate: "",
  rank: "",
  adult: "",
  seller: "",
  username :"",
  img:"",
});
const pay = ()=>{
  api.addBOrder(info.value).then((resp)=>{
    router.push({ path: "/pay", query: { username: info.value.seller, id : resp.data.id } });
  })
   
}
const addTrolley = () =>{
  api.addTrolley(info.value).then((resp)=>{
    if(resp.data == 'success'){
      ElMessage.success("添加成功")
    }else{
      ElMessage.error("添加失败")
    }
  })
}
function selectBrandById(params) {
  api.selectBrandById(params).then((resp) => {
    if(resp.data!=null){
      info.value = resp.data;
      info.value.username = localStorage.getItem("username")
    }else{
      alert('商品不存在或已被购买')
    }
   
  });
}
onMounted(() => {
  selectBrandById({ id: route.query.id });
});
</script>
<style lang="less" scoped>
.image {
  margin-top: 160px;
  margin-left: 30px;
  width: 459px;
  height: 332px;
}
.userinfo {
  margin-top: 200px;
  margin-left: 200px;
}
.buy {
  margin-top: 100px;
  margin-right: 100px;
}
.tips {
  margin-right: 160px;
  margin-top: 40px;
}
</style>
