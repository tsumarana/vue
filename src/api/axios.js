import axios from 'axios'

const api = function(url, method = 'get', data,  headers = { 'Content-type': 'application/json;charset=utf-8;', 'Authorization': localStorage.getItem("token") }) {

    let filter = url.split("?")[0];
    const list1 = ["/api/user/selectUserByUsername",
        "/api/message/selectMessage",
        "/api/friend/selectList",
        "/api/message/addMessage",
        "/api/goods/addGoods"
    ]
    const list2 = ["/api/user/selectUserByPage", "/api/goods/selectByPageAndCondition"]

    return new Promise((resolve, reject) => {
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
