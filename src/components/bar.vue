<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <el-menu-item index="1">处理中心</el-menu-item>
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
    <el-menu-item index="5" class="interval" disabled></el-menu-item>
    <el-sub-menu index="6">
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
  </el-menu>
</template>
<script lang="ts" setup>
import { ref, reactive ,getCurrentInstance} from "vue";
const api = getCurrentInstance().appContext.config.globalProperties.$api;
let data = ref("{id:"+localStorage.getItem("id")+"}")
let activeIndex = ref("2");
let Userdata = reactive({
  username: localStorage.getItem("username"),
});
const exit = () => {
  localStorage.clear();
  sessionStorage.clear();
  api.exit(data.value)
};
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<style lang="less" scope>
.interval {
  width: 1300px;
}
</style>
