<template>
  <el-container>
    <el-aside width="400px"> </el-aside>
    <el-main width="600px">
      <el-button type="primary" v-if="!update" @click="change">编辑</el-button>
      <el-descriptions
        direction="vertical"
        title="我的资料"
        :column="1"
        :size="size"
        border
        class="Form"
      >
        <el-descriptions-item label="头像">
          <img :src="user.img" />
          <el-button v-if="update" style="margin-left: 200px" type="primary"
            >上传</el-button
          >
        </el-descriptions-item>
        <el-descriptions-item label="用户名"
          ><span v-if="!update">{{ user.username }}</span>
          <input v-if="update" v-model="user.username" />
        </el-descriptions-item>

        <el-descriptions-item label="手机号" :span="2"
          ><span v-if="!update">{{ user.phone }}</span
          ><input v-if="update" v-model="user.phone"
        /></el-descriptions-item>
        <el-descriptions-item label="邮箱">
          <span v-if="!update">{{ user.email }}</span
          ><input v-if="update" v-model="user.email" />
        </el-descriptions-item>
        <el-descriptions-item label="身份证"
          ><span v-if="!update">{{ user.idCard }}</span
          ><input v-if="update" v-model="user.idCard" />
        </el-descriptions-item>
        <el-descriptions-item label="真实姓名"
          ><span v-if="!update">{{ user.name }}</span
          ><input v-if="update" v-model="user.name" />
        </el-descriptions-item>
      </el-descriptions>
    </el-main>
    <el-aside width="400px"> </el-aside>
  </el-container>
  <el-button @click="alter" type="primary" v-if="update">保存</el-button>
  <el-button @click="change" v-if="update">取消</el-button>
</template>
<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
let update = ref(false);
let show = ref("");
let size = ref("");
let user = ref({
  id: localStorage.getItem("id"),
  img: "",
  username: localStorage.getItem("username"),
  email: "",
  phone: "",
  idCard: "",
  name: "",
});
const api = getCurrentInstance().appContext.config.globalProperties.$api;
function selectInfo() {
  api.selectInfo(user.value).then((resp) => {
    console.log(resp.data);
    user.value = resp.data;
  });
}
function change() {
  update.value = !update.value;
}
function alter() {
  console.log("alter ......");
  change();
}
onMounted(() => {
  console.log("onMounted");
  selectInfo();
});
</script>
<style lang="less" scope>
.Form {
  margin-left: 10%;
  width: 500px;
}
</style>
