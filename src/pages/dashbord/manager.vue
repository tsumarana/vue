<template>
  <el-container>
    <el-aside>
      <leftBar @activeChange="activeChange" />
    </el-aside>
    <el-main>
      <userList v-if="'userSetting' == active" />
      <brandList v-if="'brandMananger' == active" :id = id :manager = manager />
      <!-- <brandList v-if="'authSetting' == active" /> -->
      <div v-if="'brandStatistics' == active" class="chart-box">
        <div class="chart-box-body">
          123
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script setup>
import userList from "../../components/userList.vue"
import leftBar from "../../components/leftBar.vue"
import brandList from "../../components/brandList.vue"
import { ref, reactive,getCurrentInstance,onMounted, nextTick } from "vue";
import * as echarts from 'echarts'
let active = ref("userSetting");
const id = ref(1);
const option = ref({
  title: {
    left: 'center',
    text: '订单交易成功统计图'
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: 
    {
      data: [],
      type: 'line',
      smooth: true
    }
});
const copy_option={
   title: {
    left: 'center',
    text: '订单交易成功统计图'
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: 
    {
      data: [],
      type: 'line',
      smooth: true
    }
}
const manager = ref("manager")
const api = getCurrentInstance().appContext.config.globalProperties.$api;
onMounted(()=>{
  
})
function activeChange(val) {
  active.value = val;
  if(val =="brandStatistics"){
    nextTick(()=>{
      const Chart = echarts.init(document.querySelector(".chart-box-body"));
      getChart(Chart);
    })   
  }else{
    option.value.xAxis.data=[]
    option.value.series.data=[]
  }
}
const getChart = (Chart)=>{
  api.getChartData().then((resp)=>{
    // Chart.setOption(option)
    resp.data.forEach((v)=>{
      option.value.xAxis.data.push(v.data);
      // option.value.series.data.push(1320);
       option.value.series.data.push(v.count);
    })
    option && Chart.setOption(option.value);
    console.log(resp.data);
  })
  
}
</script>
<style lang="less" >
.chart-box{
  width: 100%;
  height: 100%;
  .chart-box-body{
    // background-color: red;
    width: 100%;
    height: 100%;
  }
}
</style>