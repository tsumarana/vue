<template>
  <div class="personInfo">
      <div class="btn person-header">
          <p>我的资料</p>
          <el-button type="primary" v-if="!update" @click="change" size="large">编辑</el-button>
      </div>
      
      <div class="person-form">
        <el-descriptions
        direction="vertical"
        :column="1"
        :size="size"
        border
        class="Form"
      >
        <el-descriptions-item label="头像">
          <img :src="user.img" v-if="!update" class="avatar"/>
          <el-upload
            class="avatar-uploader"
            action="api/user/upload"
            v-if="update"
            accept=".jpg,.jpeg,.png"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus />
          </el-icon>
  </el-upload>
        </el-descriptions-item>
        <el-descriptions-item label="用户名"
          ><span v-if="!update" >{{ user.username }}</span>
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
      </el-descriptions></div>
      
      <div class="btn person-footer">
        <el-button @click="change" v-if="update" size="large">取消</el-button>
        <el-button @click="alter" type="primary" v-if="update" size="large" >保存</el-button>
      </div>
  </div>
  
</template>
<script lang= ts setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const imageUrl = ref('')



let update = ref(false);
let show = ref("");
let size = ref("");

let user = ref({
  id: localStorage.getItem("id"),
  img: '',
  username: localStorage.getItem("username"),
  email: "",
  phone: "",
  idCard: "",
  name: "",
});
let img = ref(localStorage.getItem("img"));
const api = getCurrentInstance().appContext.config.globalProperties.$api;

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  img.value = response.url;
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/jpg') {
    ElMessage.error('Avatar picture must be legal format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

function selectInfo() {
  api.selectInfo(user.value).then((resp) => {
    user.value = resp.data;
  });
}
function change() {
  update.value = !update.value;
  imageUrl.value=''
}
function alter() {
  user.value.img = img.value;
  localStorage.setItem("img",img.value);
  api.alterUser(user.value).then((resp)=>{
    change();
    
    selectInfo();
  })
  
}
onMounted(() => {
  selectInfo();
});
</script>
<style lang="less" scoped>
  .personInfo{
    display:flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .person-header{
      display: flex;
      flex-direction: row;
      width: 25%;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .person-form{
       width: 25%;
      .avatar{
        width: 300px;
        height: 240px;
      }
      .avatar-uploader{
        width: 300px;
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #000;
      }
    }
    .person-footer{
       width: 25%;
       margin-top: 10px;
       display: flex;
       justify-content: space-between;
    }
  }
</style>
