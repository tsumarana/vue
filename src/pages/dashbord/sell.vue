<template>
  <el-container>
    <el-main>
      <el-form ref="form" :model="brand" label-width="80px" class="addForm">
        <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action="api/goods/upload"
          accept=".jpg,.jpeg,.png"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        </el-form-item>
        
        <el-form-item label="标题">
          <el-input  v-model="brand.title" size="large"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input  v-model="brand.price" size="large"></el-input>
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="brand.grade" size="large" class="select" filterable placeholder="选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="brand.type"  class="select" size="large" filterable placeholder="选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
        </el-form-item>
        <el-form-item label="账号等级">
          <el-select v-model="brand.accountGrade"  class="select" size="large" filterable placeholder="选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
        </el-form-item>
        <el-form-item label="皮肤">
          <el-input  v-model="brand.decorate" size="large"></el-input>
        </el-form-item>
        <el-form-item label="段位">
          <el-select v-model="brand.rank" filterable class="select" placeholder="选择" size="large">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
        </el-form-item>
        <el-form-item label="是否成年">
          <el-switch v-model="brand.adult"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods" size="large">上架</el-button>
          <el-button @click="$router.push('/showbrand')" size="large">取消</el-button>
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
const value = ref('')
const options1 = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
  {
    value: '6',
    label: '6',
  },
  {
    value: '7',
    label: '7',
  },
  {
    value: '8',
    label: '8',
  },
  {
    value: '9',
    label: '9',
  },
  {
    value: '10',
    label: '10',
  },
  {
    value: '11',
    label: '11',
  },
  {
    value: '12',
    label: '12',
  },
  {
    value: '13',
    label: '13',
  },
  {
    value: '14',
    label: '14',
  },
  {
    value: '15',
    label: '15',
  },
  {
    value: '16',
    label: '16',
  },
  {
    value: '17',
    label: '17',
  },
  {
    value: '18',
    label: '18',
  },
  {
    value: '19',
    label: '19',
  },
  {
    value: '20',
    label: '20',
  },
  {
    value: '21',
    label: '21',
  },
  {
    value: '22',
    label: '22',
  },
  {
    value: '23',
    label: '23',
  },
  {
    value: '24',
    label: '24',
  },
  {
    value: '25',
    label: '25',
  },
  {
    value: '26',
    label: '26',
  },
  {
    value: '27',
    label: '27',
  },
  {
    value: '28',
    label: '28',
  },
  {
    value: '29',
    label: '29',
  },
  {
    value: '30',
    label: '30',
  },
]
const options2 = [
  {
    value:'账号',
    label:'账号',
  }
  ,{
    value:'其他',
    lable:'其他',
  }
  ]
  const options3 = [
  {
    value:'青铜',
    label:'青铜',
  }
  ,{
    value:'白银',
    lable:'白银',
  },
  {
    value:'黄金',
    lable:'黄金',
  },
  {
    value:'铂金',
    lable:'铂金',
  },
  {
    value:'钻石',
    lable:'钻石',
  },
  {
    value:'大师',
    lable:'大师',
  },
  {
    value:'王者',
    lable:'王者',
  },
  ]
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
  height: 140px;
  text-align: center;
}
.el-input {
  width: 300px;
}
.select{
  width: 300px;
}
</style>
