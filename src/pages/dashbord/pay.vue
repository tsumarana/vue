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
  myImg:"",
  success:"",
  fail:"",
  Mysuccess:"",
  Myfail:"",
})
let orderid = ref(route.query.id);
const selectInfo = ()=>{
  api.selectInfo({username:route.query.username}).then((resp)=>{
    friend.value.img = resp.data.img;
    friend.value.success = resp.data.success;
    friend.value.fail = resp.data.fail;
  })
  api.selectInfo({username:localStorage.getItem("username")}).then((resp)=>{
    friend.value.myImg = resp.data.img;
    friend.value.Mysuccess = resp.data.success;
    friend.value.Myfail = resp.data.fail;
  })
}
const finish = ()=>{
  api.pay({id:orderid.value}).then((resp)=>{
    api.addFriend(friend.value).then((resp)=>{
  })
  })
  
}
onMounted(()=>{
  selectInfo()
})
</script>
