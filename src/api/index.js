import axios from "./axios.js";


export const login = (data) => axios('/api/user/selectUser', 'post', data, false)

export const getVerImg = () => axios('/api/checkCodeServlet', 'get', false)

export const register = (data) => axios('/api/user/selectUserByUserInfo', 'post', data, false)

export const selectBrand = (url, data, needCheck) => axios(url, 'post', data, needCheck)

//查找用户接口
export const selectUser = (url, data) => axios(url, 'post', data)


export const addBrand = (data) => axios('/api/goods/addGoods', 'post', data)

//查看商品详情接口
export const selectBrandById = (data) => axios('/api/goods/selectById', 'post', data, false)

export const selectInfo = (data) => axios('/api/user/selectUserByUsername', 'post', data)

export const selectList = (data) => axios('/api/friend/selectList', 'post', data)

export const selectFriendByUsername = (data) => axios('/api/user/selectUserByUsername', "post", data)

export const selectMessage = (data) => axios('/api/message/selectMessage', 'post', data)

export const addMessage = (data) => axios('/api/message/addMessage', 'post', data)

export const checkToken = () => axios('/api/user/checkToken', false)