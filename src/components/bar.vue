<template>
<div class="menu">
  <div class="log">
      <p class="font">
        账号交易系统
      </p>
  </div>
  <div class="bar"> 
    <el-menu
    :default-active="activeIndex"
    class="bar-menu"
    mode="horizontal"
    background-color="E4E7ED"
    text-color="#000"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <!-- <el-menu-item index="1">处理中心</el-menu-item> -->
    <el-sub-menu index="2">
      <template #title>买家中心</template>
      <el-menu-item index="2-1" @click="$router.push('/showbrand')"
        >我要买</el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>卖家中心</template>
      <el-menu-item index="3-1" @click="$router.push('/sell')"
        >我要卖</el-menu-item
      >
    </el-sub-menu>
    <el-menu-item index="4" @click="$router.push('/chat')"
      >消息中心</el-menu-item
    >

    <el-sub-menu index="6" class="userinfo">
      <template #title>{{ Userdata.username }}</template>
      <el-menu-item index="6-1" @click="$router.push('/pinfo')"
        >个人信息</el-menu-item
      >
      <el-menu-item index="6-2" @click="$router.push('/btrolley')"
        >购物车</el-menu-item
      >
      <el-menu-item index="6-3" @click="$router.push('/border')"
        >买家订单</el-menu-item
      >
      <el-menu-item index="6-3" @click="$router.push('/order')"
        >卖家订单</el-menu-item
      >
      <el-menu-item index="6-4" @click="exit">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu></div>
 
  </div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive ,getCurrentInstance} from "vue";
const api = getCurrentInstance().appContext.config.globalProperties.$api;
let data = ref({ 
  id : localStorage.getItem("id")
})
let activeIndex = ref("2");
let Userdata = reactive({
  username: localStorage.getItem("username"),
});
const exit = () => {
  localStorage.clear();
  sessionStorage.clear();
  api.exit(data.value).then((resp)=>{
    if(resp.data==="ok"){
      ElMessage.success("exit success!")
    }else{
      ElMessage.error("exit error!")
    }

  })
};
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>
<style lang="less" scoped>
.menu{
  display: flex;
  .log{
    display: flex;
    width: 10%;
    border-bottom: 1px solid #E4E7ED;
    flex-wrap: nowrap;
    .font{
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      display: flex;
      font-family:"Times New Roman",Times,serif;
      font-size:14px;
      color:#000000;
      font-weight: 700;
      
    }
  }
  .bar{
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex: 1;
  width: 100%;
  .bar-menu{
    flex: 1;
    .userinfo{
      display: flex;
      position:absolute;
      top: 0;
      right: 0;
    }
  }
}
  
}

</style>
