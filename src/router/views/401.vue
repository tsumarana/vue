<template>
  <div class="page-container">
    <div class="box">
      <h1>401</h1>
      <h1>没有权限</h1>
      <RouterLink :to="{ path: '/', replace: true }" class="ant-btn ant-btn-primary"
        >回到登录页</RouterLink
      >
    </div>
    <img src="../../assets/images/401.jpg" alt="" />
  </div>
</template>


<style lang="less" scoped>
  .box{
    width: 100px;
    margin-top: 120px;
    margin-left: 47%;
  }
  .page-container {
    background: url('../../assets/images/login.svg');
    width: 100vw;
    height: 100vh;
    background-color: rgb(254, 254, 254);
    justify-content: center;
    align-items: center;
  }
</style>
