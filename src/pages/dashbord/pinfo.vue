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
          ><span >{{ user.username }}</span>
          <!-- <input v-if="update" v-model="user.username" /> -->
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
.Form {
  margin-left: 10%;
  width: 500px;
  .avatar{
    width:50px;
    height: 50px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  text-align: center;
}
</style>
