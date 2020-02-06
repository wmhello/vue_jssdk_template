<template>
  <div class="home">
	  <div  style="width: 100vw; height: 180px;">
		   <img alt="Vue logo" src="../assets/jssdk.png" style="width: 100%;height: 100%;">
	  </div>
   
	 <van-grid square>
	   <van-grid-item
	     v-for="item in lists"
	     :key="item.path"
	     :icon="item.icon"
	     :text="item.name"
		 @click="goPage(item.path)"
	   />
	 </van-grid>
  </div>
</template>

<script>
// @ is an alias to /src
const lists =[{
	name:'图像操作',
	path:'/img',
	icon: 'photo-o'
},{
	name: '页面分享',
	path: '/about',
	icon: 'gift-o'
},{
	name: '支付',
	path:'/pay',
	icon: 'orders-o'
},
{
	name: '首页',
	path: '/',
	icon: 'home-o'
}
]

export default {
  name: 'home',
  data(){
	  return {
		  lists 
	  }
  },
  methods: {
	  goPage(page){
		this.$router.push(page)  
	  }
  }
}
</script>
