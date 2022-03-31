<template>
  <el-container>
    <el-header></el-header>
    <el-container>
      <el-main></el-main>
      <el-aside width="500px">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="userData"
          :rules="rules"
          ref="ruleFormRef"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="userData.username"
              placeholder="请输入用户名6-20位"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="userData.password"
              placeholder="请输入密码8-26位"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="rePassword">
            <el-input
              v-model="userData.rePassword"
              placeholder="确认密码"
              ref="rePassword"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="userData.email"
              placeholder="请输入邮箱"
              ref="email"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input
              v-model="userData.phone"
              placeholder="请输入电话号码"
              ref="phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="idCard">
            <el-input
              v-model="userData.idCard"
              placeholder="请输入身份证"
              ref="idCard"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="userData.name"
              placeholder="请输入真实姓名"
              ref="name"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input
              class="check"
              v-model="userData.check"
              name="checkCode"
              placeholder="请输入验证码"
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
              <el-button type="primary" @click="submit(ruleFormRef)"
                >注册</el-button
              >
              <el-button type="primary" @click="$router.push('/login')"
                >已有账号，登录</el-button
              >
            </el-row>
          </el-form-item>
        </el-form>
      </el-aside>
      <el-main></el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
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
  }, 1000);
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
  }, 1000);
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
  }, 1000);
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
  }, 1000);
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
  }, 1000);
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
  }, 1000);
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
function register() {
  api.register(userData).then((res) => {
    if (resp.data == "success") {
      $message.success("创建成功");
    } else {
      $message.error("注册失败");
    }
  });
}

const ruleFormRef = ref();
//提交
const submit = (formEl) => {
  console.log(formEl);
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      api.register(userData).then((resp) => {
        if (resp.data == "success") {
          ElMessage({
            message: "注册成功",
            type: "success",
          });
          setTimeout(router.push("/login"), "2000");
        } else {
          ElMessage.error("注册失败");
        }
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
//更换验证码
function changeImg() {
  console.log("changeImg");
  api.getVerImg().then((res) => {
    console.log("changeImg", res);
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
