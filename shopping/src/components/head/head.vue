<template>
    <header id="head_top">
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
        <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="msite-title"></slot>
        <slot name="changecity"></slot>
        <slot name="changeLogin"></slot>
    </header>
</template>
<script>
 import {mapState, mapActions} from 'vuex'
 
export default {
   name:"",
    data(){
        return{
           
        }
    },
    mounted(){
         //获取用户信息
            // this.getUserInfo();
    },
    computed:{
         ...mapState([
                'userInfo'
            ]),
        
    },
    props:['signinUp', 'headTitle', 'goBack'],
    methods:{       
        ...mapActions([
            'getUserInfo'
        ]),
    }
}
</script>
<style>
  .login_span{
        color: #fff;
        position: absolute;
        top:15%;
        right: 0;
        font-weight: normal;
        font-family: "Microsoft Yahei";
        font-size:0.8rem; 
    }
   
    #head_top{
        background-color: #3190e8;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height:1.95rem; 
    }
     .head_goback{
        left: 0.4rem;
        width: 0.6rem;
        height:1rem;
        float: left; 
        line-height: 2.2rem;
        margin-left: .4rem;
    }

    .city_nav{
        padding-top: 2.35rem;
        border-top: 1px solid bc;
        background-color: #fff;
        margin-bottom: 0.4rem;
        }
      .city_nav .city_tip{
            line-height: 1.45rem;
            padding: 0 0.45rem;
          }
       .city_nav .city_tip  span:nth-of-type(1){
         }
        .city_nav .city_tip span:nth-of-type(2){
            font-weight: 900;
            font-size:0.5rem;
            color: #9f9f9f; 
        }
        .title_head{position: absolute;top: 12%;left: 40%;}
        .title_text{
            color: #fff;
            font-size:0.8rem;
            text-align: center;
            font-weight:bold;  
        }
       
</style>
