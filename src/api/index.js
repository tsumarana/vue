import axios from "./axios.js";

//登录
export const login = (data) => axios('/api/user/selectUser', 'post', data)
    //获取验证码
export const getVerImg = () => axios('/api/checkCodeServlet', 'get')
    //注册
export const register = (data) => axios('/api/user/selectUserByUserInfo', 'post', data)
    //分页条件查询商品
export const selectBrand = (url, data) => axios(url, 'post', data)
    //条件查询商品
export const selectnBrand = (data) => axios('/api/goods/selectGoods', 'post', data)
    //分页条件查找用户
export const selectUser = (url, data) => axios(url, 'post', data)
    //添加商品
export const addBrand = (data) => axios('/api/goods/addGoods', 'post', data)
    //查看商品详情接口
export const selectBrandById = (data) => axios('/api/goods/selectById', 'post', data)
    //查询用户信息
export const selectInfo = (data) => axios('/api/user/selectUserByUsername', 'post', data)
    //查找好友列表
export const selectList = (data) => axios('/api/friend/selectList', 'post', data)
    //查询好友信息
export const selectFriendByUsername = (data) => axios('/api/user/selectUserByUsername', "post", data)
    //查找消息
export const selectMessage = (data) => axios('/api/message/selectMessage', 'post', data)
    //添加消息
export const addMessage = (data) => axios('/api/message/addMessage', 'post', data)
    //退出登录
export const exit = (data) => axios("api/user/exit", "post", data)
    //添加好友
export const addFriend = (data) => axios("api/friend/makeFriend", "post", data)
    //查询购物车
export const selectTrolley = (data) => axios("api/trolley/selectTrolley", "post", data)
    //删除购物车
export const deleteTrolley = (data) => axios("api/trolley/deleteTrolley", "post", data)
    //保存购物车数目
export const saveCount = (data) => axios("api/trolley/saveCount", "post", data)
    //添加购物车
export const addTrolley = (data) => axios("api/trolley/addTrolley", "post", data)
    //修改用户个人信息
export const alterUser = (data) => axios("api/user/alterUserInfo", "post", data)
    //注销用户
export const logoffUser = (data) => axios("api/user/logoffUser", "post", data);
//冻结用户
export const freezeUser = (data) => axios("api/user/freezeUser", "post", data)
    //查询卖家订单
export const selectSellerOrder = (data) => axios("api/order/selectSellerOrder", "post", data)
    //删除卖家订单（管理员接口）
export const deleteOrder = (data) => axios("api/order/deleteOrder", "post", data)
    //删除卖家订单
export const deleteSellerOrder = (data) => axios("api/order/delete", "post", data)
    //添加到买家订单
export const addBOrder = (data) => axios("api/border/addOrder", "post", data)
    //查询买家订单
export const selectBuyerOrder = (data) => axios("api/border/selectBuyerOrder", "post", data)
    //完成支付
export const pay = (data) => axios("api/border/pay", "post", data)
    //查询交易中的订单
export const selectOrderByUser = (data) => axios("api/border/selectOrderByUser", "post", data)
    //确认订单完成
export const confirm = (data) => axios("api/border/confirm", "post", data)
    //取消订单
export const cancel = (data) => axios("api/border/cancel", "post", data)