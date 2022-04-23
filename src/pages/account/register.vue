<template>
  <el-container>
        <div class="form-box">
        <div class='register'>
        <b class="tip">用户注册</b>
        </div>
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="userData"
          :rules="rules"
          ref="ruleFormRef"
        >
          <el-form-item  prop="username">
            <el-input
             size="large"
              v-model="userData.username"
              placeholder="请输入用户名6-20位"
            >
            <template #prefix>
              <el-icon><user /></el-icon>
            </template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input
            size="large"
              v-model="userData.password"
              placeholder="请输入密码8-26位"
              show-password
            ><template #prefix><el-icon><lock /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="rePassword">
            <el-input
            size="large"
              v-model="userData.rePassword"
              placeholder="确认密码"
              ref="rePassword"
              show-password
            ><template #prefix><el-icon><lock /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="email">
            <el-input
            size="large"
              v-model="userData.email"
              placeholder="请输入邮箱"
              ref="email"
            ></el-input>
          </el-form-item>
          <el-form-item  prop="phone">
            <el-input
            size="large"
              v-model="userData.phone"
              placeholder="请输入电话号码"
              ref="phone"
            ><template #prefix><el-icon><iphone /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="idCard">
            <el-input
            size="large"
              v-model="userData.idCard"
              placeholder="请输入身份证"
              ref="idCard"
            ><template #prefix><el-icon><postcard /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="name">
            <el-input
            size="large"
              v-model="userData.name"
              placeholder="请输入真实姓名"
              ref="name"
            ><template #prefix><el-icon><user-filled /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item >
            <el-input
            size="large"
              class="check"
              v-model="userData.check"
              name="checkCode"
              placeholder="请输入验证码"
            ><template #prefix><el-icon><key /></el-icon></template>
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
        <div class="button">
              <el-button type="primary" size="large" class="register1" @click="submit(ruleFormRef)"
                >注册</el-button
              >
              <el-button  class="login" size="large" @click="$router.push('/login')"
                >已有账号，登录</el-button
              >
        </div>
        </div>
    </el-container>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { User,Lock,Phone,Postcard,UserFilled,Iphone,Key} from '@element-plus/icons-vue'
const router = useRouter();
const route = useRoute();
import { onMounted, ref, reactive, getCurrentInstance } from "vue";
const api = getCurrentInstance().appContext.config.globalProperties.$api;
const imgSrc = ref("");
let userData = reactive({
  username: "1111111678767",
  password: "11111111",
  rePassword: "11111111",
  email: "11112@qq.com",
  phone: "14785478901",
  idCard: "686788877654345567",
  name: "阿萨",
  check: "",
});

//表单验证
const userNameBlur = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("please input username"));
  }
  setTimeout(() => {
    let reg = /^[A-Za-z0-9]{6,20}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("please input by rule"));
    }
  }, 100);
};
const passwordBlur = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("please input password"));
  }
  setTimeout(() => {
    let reg = /^[A-Za-z0-9]{8,26}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("please input by rule"));
    }
  }, 100);
};
const rePasswordBlur = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("please input the password"));
  } else {
    if (userData.password !== "") {
      if (value === userData.password) {
        callback();
      } else {
        callback(new Error("please input by rule"));
      }
    }
  }
};
const emailBlur = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("please input email"));
  }
  setTimeout(() => {
    let reg = /^.*@.*$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("please input by rule"));
    }
  }, 100);
};
const phoneBlur = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("please input phone"));
  }
  setTimeout(() => {
    let reg = /^[1]+\d{10}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("please input by rule"));
    }
  }, 100);
};
const idCardBlur = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("please input idCard"));
  }
  setTimeout(() => {
    let reg = /^[xX0-9]{18}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("please input by rule"));
    }
  }, 100);
};
const nameBlur = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("please input name"));
  }
  setTimeout(() => {
    let reg = /^[\u4e00-\u9fa5]{1,4}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("please input by rule"));
    }
  }, 100);
};

//规则
const rules = reactive({
  username: [{ validator: userNameBlur, trigger: "blur" }],
  password: [{ validator: passwordBlur, trigger: "blur" }],
  rePassword: [{ validator: rePasswordBlur, trigger: "blur" }],
  email: [{ validator: emailBlur, trigger: "blur" }],
  phone: [{ validator: phoneBlur, trigger: "blur" }],
  idCard: [{ validator: idCardBlur, trigger: "blur" }],
  name: [{ validator: nameBlur, trigger: "blur" }],
});
//注册
const ruleFormRef = ref();
//提交
const submit = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    console.log(valid);
    if (valid) {
      api.register(userData).then((resp) => {
        if(resp.data == "checkError"){
          ElMessage.error("验证码错误");
          return;
        }
        if (resp.data == "success") {
          ElMessage.success("注册成功")
          setTimeout(router.push("/login"), "2000");
        } else {
          ElMessage.error("注册失败");
        }
      });
    } else {
      ElMessage.warning("请按规则提交");
    }
  });
};
//更换验证码
function changeImg() {
  console.log("changeImg");
  api.getVerImg().then((res) => {
    imgSrc.value = res.data.op;
    userData.check = res.data.verifyCode;
  });
  console.log(123);
}
onMounted(() => {
  console.log("onMounted");
  changeImg();
});
</script>
<style lang="less" scoped>
  .el-container{
    background: url('../../assets/images/login/register.jpg');
    width: 100%;
    height: 100%;
    .form-box{
      width: 600px;
      height: 650px;
      background-color: rgba(255,255,255,0.8);
      .register{
      margin-bottom: 30px;
        .tip{
          font-size: 28px;
        }
      }
      border: solid #f5f5f5;
      justify-items: center;
      justify-content: center;
      margin-left: 35%;
      margin-top: 8%;
      .el-input{
        width: 430px;
        .el-icon {
        height: 39px;
       
      }
      }
      .login{
    display: flex;
    width: 430px;
    margin-left: 97px;
    margin-top: 10px;
  }
  .register1{
    
    display: flex;
    width: 430px;
    margin-left: 97px;
  }
    }
  }
</style>