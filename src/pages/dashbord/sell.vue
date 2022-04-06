<template>
  <el-container>
    <el-main>
      <el-form ref="form" :model="brand" label-width="80px" class="addForm">
        <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action="api/goods/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        </el-form-item>
        <el-form-item label="标题">
          <el-input style="width: 300px" v-model="brand.title"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input style="width: 300px" v-model="brand.price"></el-input>
        </el-form-item>
        <el-form-item label="等级">
          <el-input style="width: 300px" v-model="brand.grade"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input style="width: 300px" v-model="brand.type"></el-input>
        </el-form-item>
        <el-form-item label="账号等级">
          <el-input
            style="width: 300px"
            v-model="brand.accountGrade"
          ></el-input>
        </el-form-item>
        <el-form-item label="皮肤">
          <el-input style="width: 300px" v-model="brand.decorate"></el-input>
        </el-form-item>
        <el-form-item label="段位">
          <el-input style="width: 300px" v-model="brand.rank"></el-input>
        </el-form-item>
        <el-form-item label="是否成年">
          <el-switch v-model="brand.adult"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods">上架</el-button>
          <el-button @click="$router.push('/showbrand')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script lang=ts setup>
import { ElMessage } from "element-plus";
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'
const router = useRouter();
const api = getCurrentInstance().appContext.config.globalProperties.$api;

let imageUrl = ref("")
let brand = reactive({
  title: "",
  price: "",
  grade: "",
  type: "",
  accountGrade: "",
  decorate: "",
  rank: "",
  adult: "",
  seller: localStorage.getItem("username"),
  img:"",
});
const addGoods = () => {
  brand.img = imageUrl.value;
  api.addBrand(brand).then((resp) => {
    if (resp.data == "success") {
      ElMessage({
        message: "上架成功",
        type: "success",
      });
      router.push("/showbrand");
    }
  });
};
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = response.url;
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
</script>
<style lang="less" scoped>
.addForm {
  margin-left: 700px;
  margin-top: 50px;
}
.avatar{
  width: 300px;
  height: 300px;
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
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
