<template>
  <el-container>
    <el-header class="header-wrap">
      <bar></bar>
    </el-header>
  </el-container>
  <router-view></router-view>
</template>
<script setup>
import bar from "../components/bar.vue";
</script>
<style lang="less" scoped>
.header-wrap {
  padding: 0;
}
</style>
