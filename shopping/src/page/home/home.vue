<template lang="html">
    	<div>
        <head-top signin-up='home'>
            <span slot='logo' class="head_logo"  @click="reload">ele.me</span>
        </head-top>
        <nav class="city_nav">
            <div class="city_tip">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <router-link :to="'/city/' + guessCityid" class="guess_city">
                <span>{{guessCity}} ></span>
                <svg class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </router-link>
        </nav>
        <section id="hot_city_container">
            <h4 class="city_title">热门城市</h4>
            <ul class="citylistul clear">
                <router-link  tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">
                    {{item.name}}
                </router-link>
            </ul>
        </section>
        <section class="group_city_container">
            <ul class="letter_classify">
                <li v-for="(value, key, index) in sortgroupcity" :key="key"  class="letter_classify_li">
                    <h4 class="city_title">{{key}}
                        <span v-if="index == 0">（按字母排序）</span>
                    </h4>
                    <ul class="groupcity_name_container citylistul clear">
                        <router-link  tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
                            {{item.name}}
                        </router-link>
                    </ul>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import headTop from '../../components/head/head'
import {cityGuess, hotcity, groupcity} from '../../service/getData'
export default {
    name:"home",
    data(){
        return{
            guessCity: '',   //当前城市
            guessCityid: '', //当前城市id
            hotcity: [],     //热门城市列表
            groupcity: {},   //所有城市列表
        }
    },
    components:{
        headTop
    },
    mounted(){
        // 获取当前城市
       cityGuess().then(res=>{
           this.guessCity=res.name;
           this.guessCityid=res.id;
       });
       //获取城市列表
       hotcity().then(res=>{
           
           this.hotcity=res
       });
    //    获取所有城市列表
        groupcity().then(res=>{
            
            this.groupcity=res
        })
    },
    computed:{
        //将获取的数据按照A-Z字母开头排序
        sortgroupcity(){
            let sortobj = {};
            for (let i = 65; i <= 90; i++) {
                if (this.groupcity[String.fromCharCode(i)]) {
                    sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
                }
            }
            return sortobj
        }
    },
    methods:{
        //点击图标刷新页面
        reload(){
            window.location.reload();
        }
    }
}
</script>
<style scoped>
    @import './home.scss';
     .head_logo{
        left: 0.4rem;
        font-weight: 400;
        font-size: 0.7rem;
        color: #fff;
        width: 2.3rem;
        height: 0.7rem;
        position: absolute;
        top: 40%;   
    }
    .guess_city{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.8rem;
        padding: 0 0.45rem;
        border-top: 1px solid #e4e4e4;
        border-bottom: 2px solid #e4e4e4;
        font: 0.75rem/1.8rem "Microsoft YaHei";

    }
    .city_tip{
        display: flex;
        justify-content:space-between ;
        font-size:0.6rem; 
    }  
     .arrow_right{
        width: 0.6rem;
      height: 0.6rem;
    }
    .city_title{
    color: #666;
    font-weight: 400;
    text-indent: 0.45rem;
    border-top: 2px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    font: 0.55rem/1.45rem "Helvetica Neue";
    }
    .citylistul {
    color: #333;
    /* font-weight: normal; */
    font-family: "Microsoft Yahei";
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    }
    .citylistul li{
        float: left;
        text-align: center;
        color:  blue;
        border:0.02rem solid #e4e4e4;
        border-radius: 0.025rem;
        width: 25%;
        height: 1.75rem;
        font: 0.6rem/1.75rem "Microsoft YaHei";
    }
</style>

