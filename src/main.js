import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/storage.js'
import '@/permission.js'
import Vant from 'vant'
import 'vant/lib/index.css';
Vue.use(Vant);
import { Grid, GridItem } from 'vant';
Vue.use(Grid);
Vue.use(GridItem);

Vue.config.productionTip = false
import wx from 'weixin-js-sdk'
import { getConfig } from '@/api/jssdk'

const actions = ['openLocation','getLocation','updateAppMessageShareData', 'updateTimelineShareData', 'chooseImage', 'uploadImage', 'previewImage', 'getLocalImgData', 'downloadImage','closeWindow','hideMenuItems', 'scanQRCode','','', 'showMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay']

router.afterEach(async (to, from) => {
  let _url = window.location.origin + to.fullPath
  // 非ios设备，切换路由时候进行重新签名
  if (window.__wxjs_is_wkwebview !== true) {
   let config = await getConfig(_url, actions)
    wx.config(config)
  }  
})

// ios 设备进入页面则进行js-sdk签名
if (window.__wxjs_is_wkwebview === true) {
  let _url = window.location.href.split('#')[0]
  Toast(_url);
  getConfig(_url, actions).then(function (res) {
    wx.config(res)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
