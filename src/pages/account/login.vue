<template>
  <el-container>
        <div class="login-box" >
        <div class="login-logo">
        <img src="../../assets/images/logo.png" width="80" />
        <b class="tip">用户登录</b>
        </div>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="LoginData"
        >
        
          <el-form-item >
            <el-input
            class="input"
            size="large"
              v-model="LoginData.username"
              @keyup.enter="login"
            >
            <template #prefix class="icon"><user-outlined type="user" /></template>
            </el-input>
          </el-form-item>
          <el-form-item >
            <el-input
               class="input"
              v-model="LoginData.password"
              placeholder="请输入密码"
              id="password"
              show-password
              size="large"
              @keyup.enter="login"
            >
            <template #prefix class="icon"><lock-outlined type="user" /></template>
            </el-input>
          </el-form-item>

          <el-form-item >
            <el-input
            size="large"
               class="input"
              v-model="LoginData.check"
              name="check"
              placeholder="请输入验证码"
              
              @keyup.enter="login"
            ><template #prefix class="icon"><SafetyOutlined /></template>
            <template #suffix>
             <img
              class="imgCheck"
              :src="imgSrc"
              id="imgCheck"
              @click="changeImg"
            />
            </template>
            </el-input>
           
           
          </el-form-item>
        </el-form>  
        <el-button type="primary" size="large" class="login" @keyup.enter="login" @click="login"
        >登录</el-button>
        <el-button type="info" size="large" class="register" @click="$router.push('/register')"
        >注册
        </el-button>
        </div>
  </el-container>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { onMounted, ref, reactive, getCurrentInstance } from "vue";
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons-vue';
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
  check: "",
});
let imgSrc = ref("");

function login() {
  api.login(LoginData).then((resp) => {
    if(resp.data.status == "checkError"){
      ElMessage.error("验证码错误");
      changeImg();
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
    LoginData.check = resp.data.verifyCode;
  });
}
onMounted(() => {
  console.log("onMounted");
  changeImg();
});
</script>
<style lang="less" scoped>
.el-container{
  background: url('../../assets/images/login/bg.jpg');
  //  background: url('../../assets/images/test.jpg');
   width: 100%;
   height: 100%;
  .login-box{
    width: 580px;
    margin-top: 12%;
    margin-left: 35%;
    border: solid #f5f5f5;
    height: 450px;
    background-color: rgba(236, 232, 232,0.4);
    
    .input{
      width: 420px;
      opacity: 100%;
    }
  }
  .login-logo{
    margin-top: 30px;
    justify-content: center;
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    .tip{
      font-size: 28px;
    }
  }
  .anticon{
    line-height: 3;
  }
  .imgCheck{
    display: flex;
    width: 90px;
    height: 33px;
    margin-top: 3px;
  }
  .login{
    display: flex;
    width: 420px;
    margin-left: 80px;
  }
  .register{
    margin-top: 10px;
    display: flex;
    width: 420px;
    margin-left: 80px;
  }
}

</style>
