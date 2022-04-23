import axios from 'axios'

const api = function(url, method = 'get', data, headers = { 'Content-type': 'application/json;charset=utf-8;', 'Authorization': localStorage.getItem("token") }) {
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