<template>
		<router-view></router-view>
</template>

<script>
import {Button,Uploader } from 'vant';
export default {
  name: 'app',
  data () {
    return {
    }
  }, 
}
</script>

<style lang="less">
  * {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      margin: 0;
      padding: 0;
  }

  html, body {
      margin: 0 auto;
      padding: 0 auto;
      height: 100%;
      -webkit-text-size-adjust: 100%;
  }
  .van-nav-bar{
    background: rgb(14,134,255); 
    color: rgb(255,255,255)
  }
  .van-hairline--bottom::after {
    border-bottom-width: 0px; 
  }
[class*=van-hairline]::after {
  display: none;
}  
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
  color: rgba(255,255,255,0.6); 
  font-size: 13px;
  letter-spacing: 1px;
} 
input:-moz-placeholder, textarea:-moz-placeholder { 
  color: rgba(255,255,255,0.6); 
  font-size: 13px;
  letter-spacing: 1px;
} 
</style>
