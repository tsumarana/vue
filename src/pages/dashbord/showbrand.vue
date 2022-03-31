<template>
  <el-container>
    <el-main>
      <brandList :needCheck="false"/>
    </el-main>
  </el-container>
</template>
<script setup>
import brandList from "../../components/brandList.vue";
import { onMounted, ref, reactive, getCurrentInstance ,onBeforeUnmount} from "vue";
import { useRouter } from "vue-router";
const needCheak = "false";
const router = useRouter();
const api = getCurrentInstance().appContext.config.globalProperties.$api;

</script>
