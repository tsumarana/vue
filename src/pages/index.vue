<template>
  <div class="all"> 
    <div class="header-wrap">
        <bar></bar>
      </div>
    <router-view class="content"></router-view>
  </div>  
</template>
<script setup>
import bar from "../components/bar.vue";

</script>
<style lang="less" scoped>
.all{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .header-wrap {
    padding: 0;
    
  }
  .content{
    flex: 1;
}
}

</style>
