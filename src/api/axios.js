import axios from 'axios'
import baseapi from './baseapi';

const api = function(url, method = 'get', data, needCheck = "true", headers = { 'Content-type': 'application/json;charset=utf-8;', 'Authorization': localStorage.getItem("token") }) {

    let filter = url.split("?")[0];
    const list1 = ["/api/user/selectUserByUsername",
        "/api/message/selectMessage",
        "/api/friend/selectList",
        "/api/message/addMessage",
        "/api/goods/addGoods"
    ]
    const list2 = ["/api/user/selectUserByPage", "/api/goods/selectByPageAndCondition"]

    return new Promise(async(resolve, reject) => {
        if (list1.indexOf(filter) !== -1 && needCheck === "true") {
            console.log("过滤器1");
            await baseapi().then((resp) => {
                if (resp.data == 200 || resp.data == 201) {
                    console.log("有效");
                } else {
                    alert("未登录")
                    reject("未登录")
                }
            })
        }
        if (list2.indexOf(filter) !== -1 && needCheck === "true") {
            console.log("过滤器2");
            await baseapi().then((resp) => {
                if (resp.data == 201) {
                    console.log("有效");
                } else {
                    alert("没有权限")
                    reject("没有权限");
                }
            })
        }
        axios({
            method: method,
            url: url,
            data: data,
            headers: headers
        }).then(res => {
            resolve(res)
        }).catch(err => {
            // 统一做一些处理
            reject(err)
        })
    })
}

export default api