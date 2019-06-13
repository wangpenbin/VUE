<template>
    <div>
        <head-top :head-title="cityname" :go-back="true">
           <div slot="changecity" tag="span" class="changecity" @click="$router.go(-1)">切换城市</div>
        </head-top>
            <form class="city_form" v-on:submit.prevent>
                <div>
                    <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required v-model='inputVaule'>
                </div>
                <div>
                    <input type="submit" name="submit" class="city_submit input_style" @click='postpois' value="提交">
                </div>
        </form>
         <header v-if="historytitle" class="pois_search_history">搜索历史</header>
          <ul class="getpois_ul">
            <li v-for="(item, index) in placelist" @click='nextpage(index, item.geohash)' :key="index">
                <h4 class="pois_name ellipsis">{{item.name}}</h4>
                <p class="pois_address ellipsis">{{item.address}}</p>
            </li>
        </ul>
         <footer v-if="historytitle&&placelist.length" class="clear_all_history" @click="clearAll">清空所有</footer>
        <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
        </div>
</template>

<script>
import headTop from '../../components/head/head'
import {setStore,getStore,removeStore} from '../../config/mUtils'
import {currentcity,searchplace,msiteAddress} from '../../service/getData'
export default {
     name:"city",
    data(){
        return{
            inputVaule:'', // 搜索地址
            cityid:"",//当前城市id
            cityname:"",//当前城市
            placelist:[], // 搜索城市列表
            placeHistory:[], // 历史搜索记录
            historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
            placeNone: false, // 搜索无结果，显示提示信息
        }
    },
    components:{
        headTop
    },
    mounted(){
        this.cityid=this.$route.params.cityid
         // 获取当前城市
        currentcity(this.cityid).then(res=>{
            this.placeNone= false;
            this.cityname=res.name
        })
     this.initData();
       
     

    },
    methods:{
         initData(){
                //获取搜索历史记录
                if (getStore('placeHistory')) {
                    this.placelist = JSON.parse(getStore('placeHistory'));
                }else{
                    this.placelist = [];
                }
            },
        postpois(){
            // 不为空时发送信息  
        if(this.inputVaule){
           searchplace(this.cityid,this.inputVaule).then(res=>{
               this.placelist=res
           })
       }
    },
    nextpage(index, geohash){ 
         let history= getStore('placeHistory');
        let address=this.placelist[index];
         if (history) {
                    let checkrepeat = false;
                    this.placeHistory = JSON.parse(history);
                    this.placeHistory.forEach(item => {
                        if (item.geohash == geohash) {
                            checkrepeat = true;
                        }
                    })
                    if (!checkrepeat) {
                        this.placeHistory.push(address)
                    }
                }else {
                    this.placeHistory.push(address)
                }
        setStore('placeHistory',this.placeHistory)
        this.$router.push({path:'/miste',query:{geohash}})       
        // 判断是否可以进入下一个页面，并保存记录

    },
    // 清空搜索记录
    clearAll(){
        removeStore('placeHistory');
        this.initData();
    }
    }

}
</script>

<style scoped>
    .changecity{
        position: absolute;
        float: right;
       top: 17%;
       right: 2%;
       color: #ffffff;
       font-size:0.8rem; 
    }
    .city_form{
        background-color: #fff;
        border-top: 1px solid bc;
        border-bottom: 1px solid bc;
        padding-top: 2.5rem;
    }
     .city_form div{
            width: 90%;
            margin: 0 auto;
            text-align: center;  
      }
   .city_form div  .input_style{
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
                width: 100%;
                height: 1.4rem;
            }
     .city_form div .city_input{
                border: 1px solid ;
                padding: 0 0.3rem;
                font-size:0.65rem;
                color: #333; 
               
            }
     .city_form div  .city_submit{
                background-color: blue;
                color: #fff;
                font-size:0.65rem;
    }
    .pois_search_history{
        font-size:0.5rem;
        padding:0.2rem 0 0 0.3rem; 
        color: #000000;
        border: 0.04rem solid #e4e4e4; 
    }
    .getpois_ul{
        background-color: #fff;
        border-top: 1px solid #ccc;
    }
  .getpois_ul  li{
            margin: 0 auto;
            padding-top: 0.65rem;
            border-bottom: 1px solid #ccc;
    }
    .getpois_ul  li .pois_name{
                margin: 0 auto 0.35rem;
                width: 90%;
               font-size:0.65rem;
               color: #333; 
     }
    .getpois_ul  li .pois_address{
                width: 90%;
                margin: 0 auto 0.55rem;
                 font-size:0.45rem;
                 color: #999; 
    }
</style>
