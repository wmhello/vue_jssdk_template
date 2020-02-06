<template>
	<div class="pay">
		<van-nav-bar title="支付" left-text="返回" left-arrow @click-left="onClickLeft" />
		<van-grid>
			<van-grid-item icon="gold-coin-o" text="1元" @click="handlePay(100)" />
			<van-grid-item icon="gold-coin-o" text="5元" @click="handlePay(500)" />
			<van-grid-item icon="gold-coin-o" text="10元" @click="handlePay(1000)" />
			<van-grid-item icon="gold-coin-o" text="100元" @click="handlePay(10000)" />
		</van-grid>
	</div>
</template>

<script>
import wx from 'weixin-js-sdk'
import operate from '@/minix/operate.js'
import {pay} from '@/api/jssdk.js'
export default {
    name:'pay',
    mixins:[operate],
    methods: {
		handlePay: function(price){
			var that = this
			this.$toast.success(`支付${price/100}元成功`);
			return 
			pay(price).then(res=>{
				 var pay = res.data
				 // 支付参数的配置问题
				  if (pay.return_code === "FAIL") {
					  console.log('支付参数错误')
					  this.$toast.fail(pay.return_msg);
					  return
				  }
				  // 普通参数的配置问题
				  if (pay.result_code === 'FAIL') {
					  this.$toast.fail(pay.err_code_des);
					  return
				  }
				  WeixinJSBridge.invoke(
					'getBrandWCPayRequest', pay,
					function(res){
						console.log(res)
						if(res.err_msg == "get_brand_wcpay_request:ok" ) {
						   // 使用以上方式判断前端返回,微信团队郑重提示：
						   // res.err_msg将在用户支付成功后返回
						   // ok，但并不保证它绝对可靠。
						}
					}
				);
		   })
	   },
   },
   created(){
	   // 微信分享配置
	      wx.ready(function () {
			  var that = this
	        wx.onMenuShareAppMessage({
	          title: '微信jssdk支付',
	          desc: '微信公众号支付页面分享',
	          link: window.location.href,
	          success: function() {
	            that.$toast.success('分享成功');
	          }
	        })
	   })
   }
}
</script>

<style></style>
