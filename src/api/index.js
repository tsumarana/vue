import axios from "./axios.js";


export const login = (data) => axios('/api/user/selectUser', 'post', data)

export const getVerImg = () => axios('/api/checkCodeServlet', 'get')

export const register = (data) => axios('/api/user/selectUserByUserInfo', 'post', data)

export const selectBrand = (url, data) => axios(url, 'post', data)

export const selectnBrand = (data) => axios('/api/goods/selectGoods', 'post', data)
//查找用户接口
export const selectUser = (url, data) => axios(url, 'post', data)


export const addBrand = (data) => axios('/api/goods/addGoods', 'post', data)

//查看商品详情接口
export const selectBrandById = (data) => axios('/api/goods/selectById', 'post', data)

export const selectInfo = (data) => axios('/api/user/selectUserByUsername', 'post', data)

export const selectList = (data) => axios('/api/friend/selectList', 'post', data)

export const selectFriendByUsername = (data) => axios('/api/user/selectUserByUsername', "post", data)

export const selectMessage = (data) => axios('/api/message/selectMessage', 'post', data)

export const addMessage = (data) => axios('/api/message/addMessage', 'post', data)

export const exit = (data) => axios("api/user/exit", "post", data)

export const addFriend = (data) => axios("api/friend/makeFriend", "post", data)

export const selectTrolley = (data) => axios("api/trolley/selectTrolley", "post", data)

export const deleteTrolley = (data) => axios("api/trolley/deleteTrolley", "post", data)

export const saveCount = (data) => axios("api/trolley/saveCount", "post", data)

export const addTrolley = (data) => axios("api/trolley/addTrolley", "post", data)

export const alterUser = (data) => axios("api/user/alterUserInfo", "post", data)

export const logoffUser = (data) => axios("api/user/logoffUser", "post", data);

export const freezeUser = (data) => axios("api/user/freezeUser", "post", data)

export const selectSellerOrder = (data) => axios("api/order/selectSellerOrder", "post", data)

export const deleteOrder = (data) => axios("api/order/deleteOrder", "post", data)

export const deleteSellerOrder = (data) => axios("api/order/delete", "post", data)
//添加到买家订单
export const addBOrder = (data) => axios("api/border/addOrder","post",data)
//查询买家订单
export const selectBuyerOrder = (data) => axios("api/border/selectBuyerOrder", "post", data)
//完成支付
export const pay = (data) => axios("api/border/pay","post",data)
