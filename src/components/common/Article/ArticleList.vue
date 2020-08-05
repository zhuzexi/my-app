<template>
	<div class="article_list" :style="{ height: articleListHeight + 'px' }">
		<!-- van-list 是必须带的标签，里面的标签可以自己加 -->
		<van-list v-model="loading" :finished="finished" finished-text="没有更多啦" @load="load_more" class="publist">
			<li v-for="(item, ing) of list" :key="ing">{{ item.name }}</li>
		</van-list>
	</div>
</template>

<script>
import articleItem from './components/article-item';

export default {
  name: 'List',
  data(){
    return{
      list: [],
      loading: false,//加载状态
      finished: false,//是否加载
      page: 1,//页数　　　 limit: 15//条数
    }
  },
 methods:{
    load_more: function() {
      this.page += 1;//页数+1
      this.onLoad();
    },
    
	onLoad() {
        let data = {
        page: this.page,
        pageSize: this.limit
        }
        axios.post('api/test/xbxxf',data)
        .then(res => {
          if(res.data.code=200){   
            // 加载状态结束
            this.loading = false;
            this.list = this.list.concat(res.data.data.list);//追加数据
            if (res.data.data.page == res.data.data.pageNum || res.data.data.list.length == 0) {  //数据全部加载完成
              this.finished = true;
            }else{
              this.finished = false;
            }        
          }  
        })
      }
}


<style scoped lang="less">
.article_list {
	overflow-y: auto;
}
</style>
