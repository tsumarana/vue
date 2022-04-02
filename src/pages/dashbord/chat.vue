<template>
  <bar />
  <el-container>
    <el-aside
      ><div class="friendList">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              id="friend"
              class="friend"
              default-active="admin"
              @select="handleSelect"
            >
              <el-menu-item v-for="item in friendList" :key="item.friendname" :index="item.friendname">
                <img class="image" :src="item.img" />
                <span>{{ item.friendname }}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div></el-aside
    >
    <el-main
      ><div class="content chat-wrap" :ref="chat" >
        <div class="chat-window">
          <div class="item" v-for="item in messageList" :key="item.id">
          <div  class="item item-left" v-if="item.fromName==activeFriend.username">
            <div class="avatar"><img :src = activeFriend.img ></div>
            <div class ="bubble">{{item.message}}</div>
          </div>
          <div  class="item item-right" v-if="item.fromName==user.username" >
            <div class ="bubble">{{item.message}}</div>
            <div class="avatar"><img :src = user.img ></div>
          </div>
        </div>
        </div>
        
      </div>
      <div class="input-area">
        <textarea name="text" id="textarea" @keyup.enter="send" v-model="input"></textarea>
        <div class="button-area">
          <button id="send-btn" @click="send">发 送</button>
        </div>
      </div></el-main
    >
    <el-aside></el-aside>
  </el-container>
</template>
<script setup>
import { onMounted, ref, reactive, getCurrentInstance ,onBeforeUnmount,nextTick} from "vue";

import { useRouter } from "vue-router";
const router = useRouter();
const api = getCurrentInstance().appContext.config.globalProperties.$api;
const socketOptions = ref({
  autoConnect: false,
});
const chat = ref(0)
let input = ref("")
let activeFriend = ref({
  username :"admin",
  img :"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3313909130,2406410525&fm=15&gp=0.jpg",
  // username :"",
  // img :"",
});
let user = ref({
  img: localStorage.getItem("img"),
  username: localStorage.getItem("username"),
});
let friendList = ref([
  {
    friendname: "",
    img: "",
  },
]);
let message = ref(
  {
    id:"",
    fromName: localStorage.getItem("username"),
    toName: activeFriend.value.username,
    message: "",
    time: "",
  },
);
let messageList = ref([{
  id:"",
  fromName:localStorage.getItem("username"),
  toName:activeFriend.value.username,
  message:"",
  time:"",
}])
let socket = ref(null);
//初始化
const init = () => {
  if ("WebSocket" in window) {
    // 实例化socket
    socket = new WebSocket("ws://localhost:8080/tomcat-demo1/websocket?token = "+localStorage.getItem("token"));
    // 监听socket连接
    socket.onopen = open;
    // 监听socket错误信息
    socket.onerror = error;
    // 监听socket消息
    socket.onmessage = getMessage;
    // 监听关闭
    socket.onclose = close;
    //监听window强关
    socket.onbeforeunload = close;
  } else {
    alert("当前浏览器 Not support websocket");
  }
};

function open() {
  console.log("socket连接成功");
}
function error() {
  close();
  console.log("连接错误");
}

function getMessage(msg) {
  console.log(msg.data);
  var json = eval("(" + msg.data + ")");
  console.log(user.value.username);
  if (json.toName == user.value.username) {
    console.log("success");
    // setMessageInnerHTML(json.message);
  } else {
    console.log("fail");
  }
  console.log("getMeesage");
}
function close() {
  console.log('close');
  socket.close();
}
//查找好友列表
const selectList = () => {
  api.selectList(user.value).then((resp) => {
    console.log(resp.data);
    friendList.value = resp.data;
  });
};
//选择好友
const handleSelect = (key) => {
  console.log("现在活跃好友名="+key);
  api.selectFriendByUsername({username:key}).then((resp)=>{
    console.log("获取到活跃好友信息---"+resp.data);
    activeFriend.value.username = key;
    message.value.toName = key;
    activeFriend.value = resp.data;
    selectMessage();
  })
};
//发送消息
const send = () => {
  console.log("send ......");
  let date = new Date();
  let hours = date.getHours();
  let min = date.getMinutes();
  let seconds = date.getSeconds();
  if(hours < 10){
    hours = "0" + hours.toString();
  }
  if(min < 10){
    min = "0" + min.toString();
  }
  if(seconds < 10){
    seconds = "0" + seconds.toString();
  }
  let time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + hours + ":"
  + min +":" + seconds;
  if(!input.value){
    alert('请输入内容')
    return;
  }
  message.value.fromName = user.value.username;
  message.value.message = input.value;
  message.value.time = time;
  let str = JSON.stringify(message.value);
  socket.send(str);
  api.addMessage(message.value).then(()=>{
    selectMessage();
  } )
input.value ="";
  
};
//获取消息列表
function selectMessage(){
  api.selectMessage(message.value).then((resp)=>{
    console.log(resp.data);
    messageList.value =resp.data;
    nextTick(()=>{
      const wrap = document.querySelectorAll('.chat-wrap')[0]
      const el = document.querySelectorAll('.chat-window')[0]
      wrap.scrollTop = el.offsetHeight
    })
    
  })
}
onBeforeUnmount(()=>{
  console.log("beforeUnmount....");
  socket.close();
})
onMounted(() => {
  console.log("onMounted");
  selectList();
  init();
  selectMessage();
});
</script>
<style lang="less" scope>
.el-aside {
  width: 17%;
}
.image {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.el-main {
  height: 760px;
  width: 900px;
  border-radius: 4px;
  border: 0.5px solid #e0e0e0;
  background-color: #f5f5f5;
  margin-left: 0px;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  float: right;
  padding: 0px;
  .content {
    width: calc(100% - 40px);
    padding: 20px;
    overflow-y: scroll;
    flex: 1;
  }
  .content:hover::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
  }
  .input-area {
    border-top: 0.5px solid #e0e0e0;
    height: 150px;
    display: flex;
    flex-flow: column;
    background-color: #fff;
  }
  textarea {
    flex: 1;
    padding: 5px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    overflow-y: auto;
    overflow-x: hidden;
    outline: none;
    resize: none;
  }

  .button-area {
    display: flex;
    height: 40px;
    margin-right: 10px;
    line-height: 40px;
    padding: 5px;
    justify-content: flex-end;
  }

  .button-area button {
    width: 80px;
    border: none;
    outline: none;
    border-radius: 4px;
    float: right;
    cursor: pointer;
  }

  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width: 10px;
  }
}
.bubble {
  max-width: 400px;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  color: #000;
  word-wrap: break-word;
  word-break: normal;
}

.item-left .bubble {
  margin-left: 15px;
  background-color: #fff;
}

.item-left .bubble:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-top: 10px solid transparent;
  border-right: 10px solid #fff;
  border-bottom: 10px solid transparent;
  left: -20px;
}

.item-right .bubble {
  margin-right: 15px;
  background-color: #9eea6a;
}

.item-right .bubble:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid #9eea6a;
  border-top: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
  right: -20px;
}

.item {
  margin-top: 15px;
  display: flex;
  
}

.item .item-right {
  justify-content: flex-end;
  width: 100%;
  display: flex;
}

.item .item-center {
  justify-content: center;
}

.item.item-center span {
  font-size: 12px;
  padding: 2px 4px;
  color: #fff;
  background-color: #dadada;
  border-radius: 3px;
  -moz-user-select: none;
  /*火狐*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  -ms-user-select: none;
  /*IE10*/
  -khtml-user-select: none;
  /*早期浏览器*/
  user-select: none;
}

.avatar img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.avatarList img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
</style>
