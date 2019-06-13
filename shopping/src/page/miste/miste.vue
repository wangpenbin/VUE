<template lang="html">
    <div class="coutent">
        <head-top  :head-title="cityname"   signin-up="home"> 
          <router-link :to="'/search/geohash'" class="link_search" slot="search">
	    		<svg width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" version="1.1">
	    			<circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
	    			<line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
	    		</svg>
    		</router-link>
        </head-top>
        <div>
            <mt-tab-container v-model="seleted">
              <!-- 轮播图 -->
                <mt-tab-container-item id="外卖">
                  <div class="swiper">
                  <mt-swipe :auto="0">
                  <mt-swipe-item>
                      <div class="swiper_dis">
                          <div v-for="(item,index) in food1" >
                          <img :src="imgBaseUrl+item.image_url" alt="">
                          <span>{{item.title}}</span>
                          </div>
                      </div>
                  </mt-swipe-item>
                  <mt-swipe-item>
                      <div class="swiper_dis">
                          <div v-for="(item,index) in food2" >
                          <img :src="imgBaseUrl+item.image_url"  alt="">
                          <span>{{item.title}}</span>
                          </div>
                      </div>
                  </mt-swipe-item>
                  </mt-swipe>
                 </div>
                 <!-- 菜单栏 -->
                    <take-out :foodTypes="foodTypes"></take-out>
            </mt-tab-container-item  >
            <mt-tab-container-item id="搜索">
                    <search></search>
            </mt-tab-container-item>
            <mt-tab-container-item id="订单">
                
            </mt-tab-container-item>
            <mt-tab-container-item id="我的">
               
            </mt-tab-container-item>
            </mt-tab-container>
        </div>
       <div>
           <!-- 底部tabler -->
           <mt-tabbar name="tab" fixed v-model="seleted">
            <mt-tab-item id="外卖">
                <img slot="icon" src="https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg">
               外卖
            </mt-tab-item>
            <mt-tab-item id="搜索">
                <img slot="icon" src="https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg">
                搜索
            </mt-tab-item>
            <mt-tab-item id="订单">
                <img slot="icon" src="https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg">
                订单
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg">
                我的
            </mt-tab-item>
        </mt-tabbar>
       </div>
    </div>
</template>
<script>
import headTop from "../../components/head/head";
import search from './demo/search'
import takeOut from "./demo/takeOut";
import {mapMutations} from 'vuex'
import {msiteAddress,msiteFoodTypes,shopList} from '../../service/getData'
export default {
  data() {
    return {
      img:"https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg",
      seleted: "外卖",
      imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      cityname: "",
      geohash: '', // city页面传递过来的地址geohash
      msiteTitle: '请选择地址...', // msite页面头部标题
      foodTypes: [], // 食品分类列表
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      food1:[],
      food2:[]
     
    };
  },
   async beforeMount(){
		if (!this.$route.query.geohash) {
			const address = await cityGuess();
			this.geohash = address.latitude + ',' + address.longitude;
		}else{
			this.geohash = this.$route.query.geohash
		}
		//保存geohash 到vuex
		  // this.SAVE_GEOHASH(this.geohash);
    	//获取位置信息
    	let res = await msiteAddress(this.geohash);
      this.msiteTitle = res.name;
      console.log()
      // 记录当前经度纬度
      this.$store.state.geohash=res;
    	// this.RECORD_ADDRESS(res);

    	this.hasGetData = true;
    },
  mounted(){
    //  根据经纬度获取地址信息
      msiteAddress(this.geohash).then(res=>{
          this.cityname=res.name
          this.msiteTitle=res.name
      });
        msiteFoodTypes(this.geohash).then(res=>{
         
          this.foodTypes=res
           for(var i=8;i<=15;i++){
            this.food2.push(res[i])
             console.log(res[i])
        }
         for(var i=0;i<8;i++){
            this.food1.push(res[i])
        }
      })
     
  },
  methods:{

  },
  watch:{
    seleted(e){
      if(this.seleted=='搜索'){
          this.cityname="搜索"
      }else if(this.seleted=='订单'){
        this.cityname="订单"
      }else if(this.seleted=="我的"){
        this.cityname = '我的'
      }else if(this.seleted=="外卖"){
        this.cityname=this.msiteTitle
      }
    }
  },
  components: {
    headTop,
    takeOut,
    search
  }
};
</script>
<style>
.coutent {
    padding-top:2rem; 
}
.link_search {
  margin: 3% 0 0 3%;
  float: left;
}
.postion {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2rem;
  display: flex;
  background: #fff;
  justify-content: space-between;
}
.postion div {
  width: 25%;
  text-align: center;
}
.postion div img {
  width: 1.3rem;
  height: 0.9rem;
  margin: 0;
  padding: 0;
}
.postion div div {
  padding: 0;
  width: 100%;
  text-align: center;
  font-size: 0.6rem;
}
 .swiper{
        width: 100%;
        height: 6.4rem;
        background: #fff;
    }
    .swiper_dis {
        display: flex;
        flex-wrap:wrap; 
    }
    .swiper_dis div{
        width: 25%;
        text-align: center;
    }
    .swiper_dis div img{
        width: 1.3rem;
        height: 1.4rem;
    }
    .swiper_dis div span{
        display: block;
        font-size:0.6rem; 
    }
</style>
