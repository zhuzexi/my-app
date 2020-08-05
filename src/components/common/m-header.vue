<template>
	<div>
		<van-nav-bar style="color: #c31a1f!important;" :title="mTitle" left-text="返回"  left-arrow  @click-left="goBack">
			<template #right>
			    <van-icon @click="showShare = true" v-if="share" name="ellipsis" size="18" />
			</template>
		</van-nav-bar>
		<m-share :show-share='showShare'></m-share>
		<!--<van-share-sheet
			class="share"
		  v-model="showShare"
		  title="立即分享给好友"
		  :options="options"
		  @select="onSelect"
		/>-->
		<!--<p>这是shareObj</p>
		<div>
			{{shareObj}}
		</div>
		<p>这是target</p>
		<div>{{target}}</div>-->
		<!--<div id="">
			<span v-for="(item, index) in shareObj" :key="index">
				{{item}}
			</span>
		</div>-->
	</div>
	<!-- <header class="wrap">
		<i class="iconfont icon-left" @click="goBack"></i>
		<span>{{ mTitle }}</span>
	</header> -->
	
</template>

<script>
import { NavBar, Dialog } from 'vant';
import mShare from "@/components/share"
export default {
	components: {
		mShare
	},
	props: {
		mTitle: {
			type: String,
			default: ''
		},
		share: {
			type: Boolean,
			default: false,
		}
	},
	data() {
		return {
			showShare: false,
			options: [
		        { name: '微信好友', icon: 'wechat' },
//		        { name: 'QQ', icon: 'qq' }
		    ],
		    shareObj: "",
		    target: {}
		}
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		onSelect(option) {
			let memberKey = JSON.parse(window.localStorage.getItem('memberKey'));
			let that = this;
			this.plusReady(() => {
				console.log(plus)
				var shares=null;
			    var shareObj ={};
			    var shareType = "";
				plus.share.getServices(function(s){
		            shares = s;
		            console.log(shares);
		            var Obj ={}
		            for(var i in s){
		                Obj[s[i].id] = s[i];
		            }
		            shareObj = Obj;
		            that.shareObj = JSON.stringify(shareObj);
		            TshareAction('weixin');
		            console.log('xxxx',shareObj);
		        }, function(e){
//		            outSet('获取分享服务列表失败：'+e.message);
		        });
		        
		        // 判断是否授权  根据id判断authenticated
			    function TshareAction(id, type){
			            
			        if(id=="weixin"){
			            if(type) {
			                shareType = "WXSceneTimeline"
			            } else {
			                shareType = "WXSceneSession"
			            }
			        }
			        
			        var target = shareObj;
			        that.target = target;
			        if(!target){
			            console.log("分享组件未准备好，请稍后再试");
			            return;
			        }
			        console.log('====',target['weixin']);
			        console.log('是否认证',target[id].authenticated);
			        if(target[id].authenticated){
			            shareMessage(target[id]);
			        }else{
			            target[id].authorize(function(){
			                alert("授权成功");
			                shareMessage(target[id]);
			            },function(){
			                alert("授权失败");
			            });
			        }
			        
			    }
			})
			// 发送分享信息 
		    function shareMessage(target,frients=false){
		        console.log('发送信息目标',target)
		        var config;
		        switch(target.id){
		            // 分享至微信好友配置
		            case 'weixin':
		                config ={
		                    type:'web',
		                    title:'何家文化',
		                    content:"DCloud HBuilder-做最好的HTML5开发工具",
		                    thumbs:[''],
		                    href:"http://api3.hejiawh.com/index.html?id=" + memberKey.memberInfoId + "&phone=" + memberKey.mobile,
		                    extra:{
		                        scene: 'WXSceneSession',
		                    }
		                }
		                break;    
		            
		            case 'qq':
		                config ={
		                    type:'text',
		                    title:'wwwwwww',
		                    content:"DCloud HBuilder-做最好的HTML5开发工具",
		                    pictures:['http://pic.90sjimg.com/design/01/30/13/50/596983bfbb2da.png'],
		                    href:"http://www.dcloud.io/",
		                }
		                break;
		                
		            case 'sinaweibo':
		                config ={
		                    type:'web',
		                    content:"DCloud HBuilder-做最好的HTML5开发工具",
		                    href:"http://www.dcloud.io/",
		                }
		                break;
		        }
		        
		        target.send(config, function(){
		            alert("分享成功！");
		        },function(e){
		            alert("分享失败："+e.message);
		        });
		    }
//			console.log(this.plusReady)
//	      	this.showShare = false;
	    },
	}
};
</script>

<style lang="scss" type="text/scss" scoped>
@import '../../common/style/mixin1';

header {
	color: #777;
	position: relative;
	width: 100%;
	height: 1.5rem;
	line-height: 1.5rem;
	text-align: center;
	padding: 0 0.266667rem;
	font-size: 0.453333rem;
	border-bottom: 0.04rem #ededed solid;
	font-family: PingFang SC;
	font-weight: bold;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

header .iconfont {
	position: absolute;
	left: 0.266667rem;
	top: 0;
	font-size: 0.666667rem;
	font-weight: bold;
}

/deep/ .van-icon {
    color: #ccc;
}

/deep/ .van-nav-bar__text{
	color: #ccc;
}

/deep/ .van-nav-bar__title{
	color: #ee0a24;
	font-size: 17px;
	// font-weight: bold;
}
</style>
