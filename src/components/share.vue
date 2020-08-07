<template>
	<div class="share_wrap">
		<van-share-sheet
			style="background: #fff;"
			class="share"
		  	v-model="isShowShare"
		  	title="立即分享给好友"
		  	:options="options"
		  	@select="onSelect"
		/>
	</div>
</template>

<script>
	import wx from "@/assets/img/share_wx.png"
	export default {
		props: {
			showShare: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				isShowShare: this.showShare,
				options: [
		        	{ name: '微信好友', id: 'weixin', type: true, icon: 'wechat' },
		        	{ name: '朋友圈', id: 'weixin', type: false, icon: wx }
		    	],
			    memberKey: JSON.parse(window.localStorage.getItem('memberKey'))
			}
		},
		watch: {
		 	showShare(val) {
		 		this.isShowShare = val;
		 	},
		 	isShowShare(val){
 				this.$emit("on-change",val);
 			}
		},
		methods: {
			onSelect(option) {
				let that = this;
				this.plusReady(() => {
					plus.share.getServices(function(s){
			            var Obj = {}
			            for(var i in s){
			                Obj[s[i].id] = s[i];
			            }
			            that.shareObj = Obj;
			            that.shareAction(option.id, option.type);
			        }, function(e){
	//		            outSet('获取分享服务列表失败：'+e.message);
			        });
				})
			},
			shareAction(id, type){
				let that = this;
				//WXSceneSession分享微信好友，WXSceneTimeline分享微信朋友圈
				let shareType = id == "weixin" && type ? 'WXSceneSession' : 'WXSceneTimeline'
		        var target = that.shareObj;
		        if(!target){
		            console.log("分享组件未准备好，请稍后再试");
		            return;
		        }
		        if(target[id].authenticated){
		            that.shareMessage(target[id], shareType);
		        }else{
		            target[id].authorize(function(){
		                alert("授权成功");
		                that.shareMessage(target[id], shareType);
		            },function(){
		                alert("授权失败");
		            });
		        }
		        
		    },
		    // 发送分享信息 
		    shareMessage(target, shareType){
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
		                    href:"http://api3.hejiawh.com/index.html?id=" + this.memberKey.memberInfoId + "&phone=" + this.memberKey.mobile,
		                    extra:{
		                        scene: shareType,
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
		}
	}
</script>

<style>
</style>