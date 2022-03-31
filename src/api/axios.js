import axios from 'axios'
import { configProviderContextKey } from 'element-plus'


const api = function (url, method ='get', data, needCheck="true" ,headers = {'Content-type':'application/json;charset=utf-8;','Authorization':localStorage.getItem("token")} ) {
    let id = url.split("?")[0];
    const list = ["/api/goods/selectByPageAndCondition","/api/user/selectUserByPage",
    "/api/user/selectUserByUsername","/api/message/selectMessage","/api/friend/selectList","/api/message/addMessage",
    "/api/goods/addGoods"]
    console.log(needCheck);
    if(list.indexOf(id) !== -1 && needCheck==="true"){
        console.log("拦截")
    }
    return new Promise((resolve,reject)=> {
        axios({
            method:method,
            url: url,
            data:data,
            headers : headers
        }).then(res=> {
            resolve(res)
        }).catch(err=> {
            // 统一做一些处理
            reject(err)
        })
    })
}

export default api


