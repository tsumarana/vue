<template>
  <el-container>
    <el-aside>
      <leftBar @activeChange="activeChange" />
    </el-aside>
    <el-main>
      <userList v-if="'userSetting' == active" />
      <brandList v-if="'brandMananger' == active" :id = id />
      <brandList v-if="'authSetting' == active" />
      <brandList v-if="'brandStatistics' == active" />
    </el-main>
  </el-container>
</template>
<script setup>
import userList from "../../components/userList.vue"
import leftBar from "../../components/leftBar.vue"
import brandList from "../../components/brandList.vue"
import { ref, reactive } from "vue";
let active = ref("userSetting");
const id = ref(1);
function activeChange(val) {
  active.value = val;
}
</script>
