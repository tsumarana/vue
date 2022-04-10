<template>
  <el-container>
      <div class="friendList">
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
      </div>

    <div class="center">
      <div class="nowOrder" v-if="activeFriend.username!=='admin'">当前订单{{brand.name}}</div>
      <div class="content chat-wrap" :ref="chat" >
        <div class="chat-window">
          <div class="item" v-for="item in messageList.list" :key="item.id">
          <div  class="item item-left" v-if="item.fromName==activeFriend.username">
            <div class="avatar"><img :src = activeFriend.img ></div>
            <div class ="bubble">{{item.message}}</div>
          </div>
          <div  class="item item-right" v-if="item.fromName==user.username" >
            <div class ="bubble">{{item.message}}</div>
            <div class="avatar"><img :src = user.img ></div>
          </div>
        </div>
        </div></div>

      <div class="icon" v-if="activeFriend.username=='admin'">
        <el-upload
        ref="uploadRef"
        class="upload-demo"
        action="api/message/upload"
        accept=".mp4,.avi,.wmv"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :auto-upload="true"
        >
      <el-icon  >
              <upload />
      </el-icon>
      </el-upload>
         
        </div>
      <div class="input-area">
        
        <textarea name="text" id="textarea" @keyup.enter="send" v-model="input"></textarea>
        <div class="button-area">
          <button id="send-btn" @click="send">发 送</button>
        </div>
      </div>

    </div>

      <div class="right">
        <div class="userinfo">
          <el-descriptions title="" column="1">
            <el-descriptions-item label="用户:" v-if="activeFriend.username=='admin'">管理员</el-descriptions-item>
            <el-descriptions-item label="用户:" v-if="activeFriend.username !=='admin'">{{activeFriend.username}}</el-descriptions-item>
            <el-descriptions-item label="卖家信誉:" v-if="activeFriend.username!=='admin'">新用户</el-descriptions-item>
            <el-descriptions-item label="成交订单:" v-if="activeFriend.username!=='admin'">{{activeFriend.success}}</el-descriptions-item>
            <el-descriptions-item label="取消订单:" v-if="activeFriend.username!=='admin'">{{activeFriend.fail}}</el-descriptions-item>
            <el-descriptions-item label="成交概率:" v-if="activeFriend.username!=='admin'">{{activeFriend.success/(Number(activeFriend.success)+Number(activeFriend.fail))}}</el-descriptions-item>
          </el-descriptions>
        </div>
        <div v-for="item in brandList"  :key="item.name"  >
        <el-link type="primary" @click="change(item)" >{{item.name}}</el-link>
        </div>
        <div class="tips" v-if="activeFriend.username!=='admin'">
        <p class="warntip">温馨提示</p>
        <span class="littleTip">未成年人请在监护下进行购买</span>
        </div>
        <div class="button" v-if="activeFriend.username!=='admin'">
        <el-button class="confirm" @click="confirm">确认</el-button>
        <el-button class="cancel" @click="cancel">取消</el-button>
      </div>
    </div>

  </el-container>
</template>
<script  setup>
import { onMounted, ref, reactive, getCurrentInstance ,onBeforeUnmount,nextTick} from "vue";
import { Upload } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
// import type { UploadProps } from 'element-plus'
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
  success:"",
  fail:"",
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
    success:"",
    fail:"",
  },
]);
let brand = ref({
  name:'',
  id:''
})
let brandList = ref([
  {
    name:'',
    id:'',
  }
])
let message = ref(
  {
    id:"",
    fromName: localStorage.getItem("username"),
    toName: activeFriend.value.username,
    message: "",
    time: "",
  },
);
let  messageList = reactive({
  list:[
    {
      id:"",
      fromName:localStorage.getItem("username"),
      toName:activeFriend.value.username,
      message:"",
      time:"",  
    }
  ]
})
let socket = ref(null);
//初始化
const init = () => {
  if ("WebSocket" in window) {
    // 实例化socket
    socket = new WebSocket("ws://localhost:8070/websocket?token = "+localStorage.getItem("token"));
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

function getMessage(data) {
  const msg = JSON.parse(data.data)
   if (msg.toName == user.value.username) {
    messageList.list.push(msg)
    scrollBottom()
  } else { 
  }
}

function close() {
  console.log('close');
  socket.close();
}
//改变订单
const change = (item)=>{
  brand.value = item
}
//查询交易中的订单
const selectOrderByUser = () => {
  brand.value.name = "";
  brand.value.id = "";
  brandList.value = null;
  api.selectOrderByUser({buyer:localStorage.getItem("username"),seller:activeFriend.value.username}).then((resp) => {
  if(resp.data.length !== 0){
    brandList.value = resp.data;
    brand.value.id = resp.data[0].id;
    brand.value.name = resp.data[0].name;
  }
  });
}
//取消订单
const cancel = ()=>{
  api.cancel({id:brand.value.id}).then((resp)=>{
    selectOrderByUser();
  })
}
//确认完成
const confirm = ()=>{
  api.confirm({id:brand.value.id}).then((resp)=>{
    selectOrderByUser();
  })
}
//上传成功
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  if(response.status =="success"){
    ElMessage.success("上传成功")
  }else{
    ElMessage.error("上传失败")
  }
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
  console.log(key);
  api.selectFriendByUsername({username:key}).then((resp)=>{
    activeFriend.value.username = key;
    message.value.toName = key;
    activeFriend.value = resp.data;
    selectOrderByUser();
    selectMessage();
  })
};
//发送消息
const send = () => {
  let date = new Date();
  let time = date.toLocaleString();
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
function scrollBottom(){
   nextTick(()=>{
      const wrap = document.querySelectorAll('.chat-wrap')[0]
      const el = document.querySelectorAll('.chat-window')[0]
      wrap.scrollTop = el.offsetHeight
    })
}
//获取消息列表
function selectMessage(){
  console.log('selectMessage');
  api.selectMessage(message.value).then((resp)=>{
    messageList.list =resp.data;
    scrollBottom()
    
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
<style lang="less" scoped>
.el-container{
  background: url('../../assets/images/login.svg');
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
.nowOrder{
  display: flex;
  justify-content: center;
}
.avatarList img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.friendList  {
  display: flex;
  width: 300px;
  height: 100%;
  
  .el-menu-item{
    border: solid rgba(244, 226, 226, 0.2);
    width: 300px
  }
  
}
.image {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.center {
  height: 795px;
  width: 1200px;
  border-radius: 4px;
  border: 0.5px solid #e0e0e0;
  background-color: rgba(249, 242, 242, 0.6);
  margin-left: 0px;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  float: right;
  padding: 0px;
  .icon{
    height: 15px;
    background-color: rgb(255, 255, 255);
    display: flex;
    border-top: 0.5px solid #e0e0e0;
    
  }
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
    background-color: rgba(255, 255, 255, 0.6);
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
    background-color: rgba(255, 255, 255, 0.6);
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
.right {
  text-align: center;
  height: 100%;
  .userinfo{
    display: flex;
    justify-content: center;
    .el-descriptions{
      display: flex;
      margin-top: 60px;
      text-align:center;
      justify-content: center;
      width:300px
  }
  }
  .tips{
    margin-top: 50px;
    .warntip{
      font-size: 36px;
      display: flex;
      justify-content: center;
      }
    .littleTip{
      display: flex;
      margin-top: 60px;
      justify-content: center;
    }
  }
  .button{
    margin-top: 340px;
    display: flex;
    .confirm{
      margin-left: 30px;
      display: flex;
    }
    .cancel{
      margin-left: 100%-50px;
      display: flex;
    }
  }  
}

</style>
