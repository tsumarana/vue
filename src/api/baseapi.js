import axios from 'axios'
const baseapi = function(url = "/api/user/checkToken", method = 'get', needCheck = "true", headers = { 'Content-type': 'application/json;charset=utf-8;', 'Authorization': localStorage.getItem("token") }) {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            headers: headers
        }).then(res => {
            resolve(res)
        }).catch(err => {
            // 统一做一些处理
            reject(err)
        })
    })
}

export default baseapi