<template>
  <el-container>
    <el-header height="100px"></el-header>
    <el-container>
      <el-main line-height="100px"></el-main>
      <el-aside width="500px" line-height="100px"> </el-aside>
      <el-main line-height="100px"></el-main>
    </el-container>

    <el-container>
      <el-main></el-main>
      <el-aside width="500px">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="LoginData"
        >
          <el-form-item label="账号">
            <el-input
              v-model="LoginData.username"
              @keyup.enter="login"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="LoginData.password"
              placeholder="请输入密码"
              id="password"
              show-password
              @keyup.enter="login"
            ></el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input
              class="check"
              v-model="LoginData.checkCode"
              id="check"
              name="checkCode"
              placeholder="请输入验证码"
              @keyup.enter="login"
            ></el-input>
            <img
              class="imgCheck"
              :src="imgSrc"
              id="imgCheck"
              @click="changeImg"
            />
            <a @click="changeImg">看不清?换一个</a>
          </el-form-item>

          <el-form-item>
            <el-row>
              <el-button type="primary" @click="login" @keyup.enter="login"
                >登录</el-button
              >
              <el-button type="info" @click="$router.push('/register')"
                >注册</el-button
              >
            </el-row>
          </el-form-item>
        </el-form>
      </el-aside>
      <el-main></el-main>
    </el-container>
    <el-container>
      <el-footer height="280px">
      </el-footer>
    </el-container>
  </el-container>
  
</template>
<script setup>
import { ElMessage } from "element-plus";
import { onMounted, ref, reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const api = getCurrentInstance().appContext.config.globalProperties.$api;
let LoginData = reactive({
  id: "",
  username: "b",
  password: "1",
  email: "",
  phone: "",
  idCard: "",
  name: "",
  vip: "",
  checkCode: "",
});
let imgSrc = ref("");

function login() {
  api.login(LoginData).then((resp) => {
    if(resp == "checkError"){
      ElMessage.error("验证码错误");
      return;
    }
    localStorage.setItem("token",resp.data.token);
    localStorage.setItem("username",resp.data.username);
    localStorage.setItem("id",resp.data.id);
    localStorage.setItem("img",resp.data.img);
    if (resp.data.role === "1011") {
      router.push("/manager");
    } else if (resp.data.role === "1012") {
      router.push('/showbrand');
    } else if(resp.data.role === "1013"){
      ElMessage.error("账号或密码错误");
    }else{
      return ;
    }
  });
}
function changeImg() {
  console.log("changeImg");
  api.getVerImg().then((resp) => {
    console.log("changeImg", resp);
    imgSrc.value = resp.data.op;
    LoginData.checkCode = resp.data.verifyCode;
  });
}
onMounted(() => {
  console.log("onMounted");
  changeImg();
});
</script>
