<template>
  <div class="wrap">
    <van-nav-bar class="nav" title="超级车辆智能分析系统"/>
    <van-field v-model="vpl_number" readonly="readonly" class="searchInput"  placeholder="输入车牌进行搜索查询">
      <van-button @click="query" slot="button" size="small" type="primary"><van-icon name="search" /> 查询</van-button>
      <!--<van-icon slot="icon" name="search" />-->
    </van-field>
    <div class="upBtn_wrap">
      <van-uploader :after-read="onRead" :max-size="3145728" @oversize="upOversize" class="upload" accept="image/gif, image/jpeg" multiple>
        <img src="../assets/img/button.png" />
      </van-uploader>         
    </div>
 
    <van-popup :close-on-click-overlay="false" class="popup_loaading" v-model="loadingShow">
      <van-loading class="spin" type="spinner" color="black" />
      <p>正在上传图片分析...</p>
    </van-popup>

    <van-popup :close-on-click-overlay="true" class="popup" v-model="poupShow">
      <img class="spin" src="../../static/img/white.png"/>
      <p>这些车牌是你能查的么！</p>
    </van-popup>

    <van-popup :close-on-click-overlay="true" class="popup" v-model="fancheShow">
      <img class="spin" src="../../static/img/fanche.gif"/>
      <p>老司机翻车啦...</p>
    </van-popup>    
  </div>
</template>

<script>
import { Row, Col,NavBar  } from 'vant';
import {Button,Uploader,Icon,Field,Toast,Popup,Loading} from 'vant';
//import Keyboard from '@/components/MixedKeyboard'
export default {
  name: 'home',
  data () {
    return {
      loadingShow: false,
      poupShow: false,
      fancheShow: false,
      //vpl_number: 'trrey'
    }
  },
  computed: {
    vpl_number () {
      return sessionStorage.getItem('vpl_number')? sessionStorage.getItem('vpl_number'):'';
    }
  },  
  mounted () {
    sessionStorage.setItem('vpl_number', '');
    sessionStorage.setItem('car_img', '');
    document.getElementById('mixed-keyboard-box').style.display = 'block';
  },   
  methods: {
    upOversize (file) {
      Toast.fail('图片超过3MB啦!');
    },
    onRead(file) {
      this.loadingShow = true;
      let formdata = new FormData();
          formdata.append('car_image',file.file);
          formdata.append('type','car_image');
      let config = {  
          headers: {'Content-Type': 'multipart/form-data'}
      };  //添加请求头  
      this.$http.post('ai/upload',formdata,config).then(res=>{ 
          this.loadingShow = false;
          if(res.status==200){
            if(res.data.data.length==1||res.data.data.length==0){
              Toast.fail(res.data.message);
              this.fancheShow = true;
              return
            }
            sessionStorage.setItem('vplData', JSON.stringify(res.data.data));
            sessionStorage.setItem('car_img', file.content);
            sessionStorage.setItem('vpl_number', res.data.data.vpl_type? res.data.data.vpl_type:'');
            this.$router.push({ name: 'detail'});  
          } else{
            Toast.fail('请求失败啦!');
          }
      })       
    },
    query () { 
      //let vpl_number = '京KS9537';
      let white = ['陕A66TU5','粤BF49883','陕A570TQ','陕AW8D35'];
      let vpl_number =  sessionStorage.getItem('vpl_number')
        if(!vpl_number&&vpl_number==''){
          Toast.fail('输入车牌号噢!');
          return
        }
        if(white.some((elem)=>elem == vpl_number)){
          this.poupShow = true;
          return
        }        
        this.$http.get('ai/index',{params: {vpl_number}}).then(res=>{ 
          if(res.status==200){
            if(res.data.data.length==0){
              Toast.fail(res.data.message);
              return
            }
            sessionStorage.setItem('vplData', JSON.stringify(res.data.data));
            this.$router.push({ name: 'detail'});  
          } else{
            Toast.fail('请求失败啦!');
          }         
        })           
    }    
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Icon.name]: Icon,
    [Field.name]: Field, 
    [Toast.name]: Toast,
    [Popup.name]: Popup,  
    [Loading.name]: Loading,    
    //keyboard:Keyboard,
  }  
}
</script>

<style lang="less">
.wrap{
  .nav{
    background: rgb(14,134,255);
  }
  height: 100%;
  width: 100%;
  background: rgb(14,134,255);
  .searchInput{
    background: rgb(14,134,255);
    input{
      height: 40px;
      background: rgb(14,128,242);
      border-radius: 3px;
      color: #fff;
      letter-spacing: 15px;
      padding-left: 15px;
      border: 1px solid rgba(0,0,0,.1);
    }
    button{
      height: 40px;
      background: rgb(14,128,242);
      border-radius: 3px;   
      border: 0px;  
      letter-spacing: 1px; 
      border: 1px solid rgba(0,0,0,.1);
    }
  }
  .upBtn_wrap{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .upload{
      width: 50%;
      margin-top: 5%;
      img{
        width: 100%;
      }
    }
  }
  .popup_loaading{
    width: 50%;
    height: 150px;
    background-color: rgba(0,0,0,.5);
    text-align: center;
    color: #fff;
    .spin{
      height: 60px;
      margin: 20px auto;
    }
  }
  .popup{
    width: 70%;
    height: 250px;
    background-color: #fff;
    text-align: center;
    color: #222;
    .spin{
      height: 200px;
      max-width: 100%;
    }
  }
}
</style>
