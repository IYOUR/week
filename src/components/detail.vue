<template>
  <div class="detailWrap">
    <van-nav-bar class="nav" left-arrow :title="vpl_number" @click-left="onClickLeft"/>
    <van-tabs>
      <van-tab title="基本信息">
        <van-panel v-if="car_img" title="车辆图片">
          <div>
            <img :src="car_img" style="width:100%"/>
          </div>
         </van-panel>
         <van-panel title="最常停放">
          <van-cell-group :border="true"> 
            <van-cell v-for="(item,key) in vplData" :key="key" :title="item.parking_name" :value="'停放次数：'+item.parking_times" :label="'累计时长：'+item.parking_total_time"/>
          </van-cell-group>          
        </van-panel>
      </van-tab>
      <van-tab title="热力图">
          <baidu-map 
          class="map" 
          style="width:100%; height:85vh;"
          :center="'西安市'"
          :zoom="11"
          :scroll-wheel-zoom="true"
          :ak="'GAksItkSpA2HzIVHA0xAbLGVhdHXbKf9'"
          >
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bml-heatmap :data="heatmapData" :max="5" :radius="20">
            </bml-heatmap>
          </baidu-map>
      </van-tab>
      <van-tab title="用户画像">
        <van-panel>
          <div style="height:100px;line-height:100px;text-align:center;">
            <p style="font-size: 20px;">{{portal.parking_type_name}}</p>
          </div>
          <img style="width:100%;height:auto;padding-bottom: 100px" :src="'../../../static/img/'+portal.parking_type_name+'.png'"/>
          
        </van-panel>
      </van-tab>            
    </van-tabs>    
  </div>
</template>

<script>
import { Row, Col,NavBar,Tab,Tabs,Panel,Cell, CellGroup} from 'vant';
import {BaiduMap,BmlHeatmap,BmMarker,BmNavigation} from 'vue-baidu-map';
export default {
  name: 'detail',
  data () {
    return {
    //   heatmapData:[{lng: 116.418261, lat: 39.921984, count: 10},
    //     {lng: 116.423332, lat: 39.916532, count: 31},
    //     {lng: 116.419787, lat: 39.930658, count: 45}]
    }
  },
  computed: {
    vpl_number () {
      return sessionStorage.getItem('vpl_number');
    },
    car_img () {
      return sessionStorage.getItem('car_img');
    },
    vplData () {
      let data = JSON.parse(sessionStorage.getItem('vplData')),arr=[];
      for(let key in data){
        if(data[key].parking_name)
          arr.push(data[key])
      }
      if(arr.length>1){
        arr.sort((a,b)=>{
          return b.parking_times - a.parking_times
        })
      }
      return arr
    },
    //热力图
    heatmapData () {
      let data = JSON.parse(sessionStorage.getItem('vplData')),arr=[];
      for(let item in data){
        arr.push({
          lng: data[item].longitude, 
          lat: data[item].latitude, 
          count: data[item].parking_times
        })
      }
      return arr     
    },
    //画像
    portal () {
      let data = JSON.parse(sessionStorage.getItem('vplData')),arr=[];
      for(let key in data){
        if(data[key].parking_name)
          arr.push(data[key])
      }
      if(arr.length>1){
        arr.sort((a,b)=>{
          return a.parking_times - b.parking_times
        })
        return arr[arr.length-1]
      }
      return arr[arr.length-1]
 

    }
  },
  mounted () {
    document.getElementById('mixed-keyboard-box').style.display = 'none';

 
  },  
  methods: {
    onClickLeft () {
      this.$router.push({ name: 'home'});   
    }
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,   
    [Tabs.name]: Tabs,   
    [Panel.name]: Panel,
    [Cell.name]: Cell,
    [CellGroup .name]: CellGroup ,
    BmlHeatmap: BmlHeatmap,
    BmMarker,BmMarker,
    BaiduMap: BaiduMap,
    BmNavigation: BmNavigation,
  }  
}
</script>

<style lang="less">
  .van-tab--active {
    color: rgb(14,134,255);
  }
  .van-tabs__nav-bar {
      background-color: rgb(14,134,255);
  }  
.van-nav-bar .van-icon {
    color: #fff;
}  
.detailWrap{
  height: 100%;
  width: 100%;
  background: #eef0f4;
  .nav{
    background: rgb(14,134,255);
  }
  .van-tabs__content{
    padding: 10px;
  }
  .van-cell{
    border-bottom: 1px solid #e8e8e8;
  }
}
</style>
