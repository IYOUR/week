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

          <div id="allmap" style="width:100%;height:500px"> </div>
      </van-tab>
      <van-tab title="用户画像">
        <van-panel>
          <div style="height:100px;line-height:100px;text-align:center;">
            <p style="font-size: 20px;">{{portal.parking_type_name}}</p>
          </div>
          <img style="width:100%;height:auto;" :src="'../../../static/img/'+portal.parking_type+'.png'"/>
          
        </van-panel>
      </van-tab>            
    </van-tabs>    
  </div>
</template>

<script>
import { Row, Col,NavBar,Tab,Tabs,Panel,Cell, CellGroup} from 'vant';
import {BaiduMap,BmlHeatmap,BmMarker} from 'vue-baidu-map';
import inMap from 'inmap';
import {MP} from '../map.js';
export default {
  name: 'detail',
  data () {
    return {
      heatmapData:[{lng: 109.00, lat: 34.225,count: 80}]
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
      return arr
    },
    //热力图
    // heatmapData () {
    //   let data = JSON.parse(sessionStorage.getItem('vplData')),arr=[];
    //   for(let item in data){
    //     arr.push({
    //       lng: data[item].longitude, 
    //       lat: data[item].latitude, 
    //       count: data[item].parking_times
    //     })
    //   }
    //   return arr     
    // },
    //画像
    portal () {
      let data = JSON.parse(sessionStorage.getItem('vplData')),arr=[];
      for(let item in data){
        arr.push(data[item])
      }
      arr.sort((a,b)=>{
        return a.parking_times - b.parking_times
      })
      return arr[arr.length-1]
    }
  },
  mounted () {
    document.getElementById('mixed-keyboard-box').style.display = 'none';

    this.$nextTick(function(){  
                  var _this = this;  
                  MP('GAksItkSpA2HzIVHA0xAbLGVhdHXbKf9').then(BMap => {  
                              //在此调用api  
                    var data=[{"lng":"116.395645","lat":"39.929986","count":6},{"lng":"121.487899","lat":"31.249162","count":6},];
                    var inmap = new inMap.Map({
                      id: "allmap",
                      skin: "Blueness",
                      center: [116.405335,39.91823],
                      zoom: {
                        value: 4,
                        show: true,
                        max: 16,
                        min: 4
                      }
                    });
                    var overlay = new inMap.HeatOverlay({
                      style: {
                        normal: {
                          radius: 10, // 半径
                          minScope: 0, // 最小区间,小于此区间的不显示
                          maxScope: 1 // 最大区间,大于此区间的不显示
                        },
                      },
                    });
                    inmap.add(overlay);
                    overlay.setPoints(data);
    })})

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
