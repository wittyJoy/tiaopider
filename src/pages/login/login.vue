<template>
  <div class="login-page"> 
    <div class="top">
			<div class="top_logo">
				<div id="logobox" class="logo_imgbox">
					<img src="@/assets/img/logo/example.jpg" width="100px" draggable="false">
				</div>
			</div>
			<div id="top_title">
				<!-- <img alt="tiao" src=""> -->
				<hr class="top_hr_style01">
				<!-- <img alt="tiao" src=""> -->
			</div>
			<ul class="top_navlist">
				<a class="top_nav" draggable="false" @click="toLogin">
					<li>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</li>
				</a>
				<a target="_blank" href="" class="top_nav" draggable="false">
					<li>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</li>
				</a>
				<a href="javascript:window.close()" class="top_nav" draggable="false">
					<li>离开这里</li>
				</a>
			</ul>
		</div>

		<footer class="top_footer">
			<span class="footer_desc">
				<hr class="top_hr_style02">
				<a href="javascript:void(0)">(°ˊДˋ°)つ友情链接</a>
				<hr class="top_hr_style02">
				<a href="javascript:void(0)">调皮点~~~</a> ..................人不轻狂枉少年.................. <a href="javascript:void(0)">皮就完事了~~~</a>
			</span>
		</footer>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
			toLogin(){
				this.$router.push('/home');
			}
		},

    watch: {}

  }

</script>
<style scoped lang="scss">  
.login-page{
  width: 100vw;
  min-height: 100vh;
	background-image: url(../../assets/img/006wjYU.jpg);
}
.top{
	padding: 10px 0 ;
}

.top_logo {
	animation: A 15s linear 0s infinite;
	width: 100px;
	height: 100px;
	background-image: url(../../assets/img/logo/activeF.png);
	background-size: cover;
	height: 100px;
	display: block;
	margin:0 auto;
	padding: 80px;
}
.top_logo:hover {background-image: url(../../assets/img/logo/activeB.png);}
.logo_imgbox{
	width: 100px;
	height: 100px;
	border-radius: 50px;
	overflow: hidden;
}
.logo_imgbox img {
	display: block;
	height: 100%;
}
@keyframes A{
	0% {
		transform: rotate(0deg)
	}
	100% {
		transform: rotate(360deg)
	}
}

.top_navlist {
	display: block;
	width: 30%;
	height: 220px;
	max-width: 220px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 50px
}

.top_navlist::after {
	content: " ";
	display: block;
	width: 20%;
	height: 150px
}

.top_nav {
	background: rgba(0, 0, 0, 0.4);
	border-radius: 5px;
	display: block;
	width: 100%;
	max-height: 40px;
	min-height: 10px;
	margin-top: 15px;
	text-decoration: none;
	font-size: 90%;
	color:#FFF;
	text-align: center;
	transition: .2s linear;
	line-height: 180%;
}

.top_nav:hover {
	color:#757575;
	background: #FFF;

}

.top_footer {
	padding: 4px 10px 4px 10px;
	background-color: #000;
	background-color: rgba(0, 0, 0, 0.4);
	color: #858585;
	position: fixed;
	bottom: 0px;
	left: 0px;
	right: 0px;
	z-index: 12;
	transition: .2s linear;
}

.footer_desc {
	display: block;
	transition: .2s linear;
	font-size: 10px;
	letter-spacing: 1.5px;
	text-align: center;
}

.top_hr_style01 {
	width: 70%;
	margin: 5px auto;
	border: 0;
	border-bottom: 1px solid #757575
}

.top_hr_style02 {
	border: 0;
	border-bottom: 1px dashed #757575
}

</style>