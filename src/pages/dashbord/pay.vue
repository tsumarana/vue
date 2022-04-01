<template>
  <button @click="finish">完成支付</button>
</template>
<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const api = getCurrentInstance().appContext.config.globalProperties.$api;
const router = useRouter();
const route = useRoute();
let friend = ref({
  username:localStorage.getItem("username"),
  friendname:route.query.username,
  img:"",
  myImg:""
})
const selectInfo = ()=>{
  api.selectInfo({username:route.query.username}).then((resp)=>{
    friend.value.img = resp.data.img;
  })
  api.selectInfo({username:localStorage.getItem("username")}).then((resp)=>{
    friend.value.myImg = resp.data.img;
  })
}
const finish = ()=>{
  console.log(friend.value);
  api.addFriend(friend.value).then((resp)=>{
      router.push("/chat");
  })
}
onMounted(()=>{
  selectInfo()
})
</script>
