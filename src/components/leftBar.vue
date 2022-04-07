<template>
  <el-row class="tac" width="200px">
    <el-col :span="12">
      <el-menu
        :default-active="'userSetting'"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item v-for="item in menuOptions" :key="item.key" :index="item.key">
          <i class="el-icon-location"></i>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
const emit = defineEmits(["activeChange"]);
let activeNum = ref(1);
const menuOptions = ref([
  {
    key: "userSetting",
    name: "用户管理",
  },
  {
    key: "brandMananger",
    name: "商品管理",
  },
  // {
  //   key: "authSetting",
  //   name: "权限管理",
  // },
  {
    key: "brandStatistics",
    name: "商品统计",
  },
]);
const handleSelect = (key) => {
  console.log(key);
  emit("activeChange", key);
};
onMounted(() => {});
</script>
<style lang="less"></style>
