<template>
  <div class="page-container">
    <div>
      <h1>404</h1>
      <h1>OOPS！你好像走丢了...</h1>
      <RouterLink :to="{ path: '/', replace: true }" class="ant-btn ant-btn-primary"
        >回到登录页</RouterLink
      >
    </div>
    <img src="../../assets/images/404.gif" alt="" />
  </div>
</template>


<style lang="less" scoped>
  .page-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: white;
    justify-content: center;
    align-items: center;
  }
</style>
