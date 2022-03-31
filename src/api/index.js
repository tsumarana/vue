import axios from "./axios.js";


export const login = (data) => axios('/api/user/selectUser', 'post', data)

export const getVerImg = () => axios('/api/checkCodeServlet', 'get')

export const register = (data) => axios('/api/user/selectUserByUserInfo', 'post', data)

export const selectBrand = (url, data) => axios(url, 'post', data)

export const selectUser = (url, data) => axios(url, 'post', data)

export const addBrand = (data) => axios('/api/goods/addGoods', 'post', data)

export const selectBrandById = (data) => axios('/api/goods/selectById', 'post', data)

export const selectInfo = (data) => axios('/api/user/selectUserByUsername', 'post', data)

export const selectList = (data) => axios('/api/friend/selectList', 'post', data)

export const selectFriendByUsername = (data) => axios('/api/user/selectUserByUsername', "post", data)

export const selectMessage = (data) => axios('/api/message/selectMessage', 'post', data)

export const addMessage = (data) => axios('/api/message/addMessage', 'post', data)

export const testToken = (data) => axios('/api/filter/tokenCheck', 'post', data)