import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '../config/env'
Vue.use(Router)
import APP from '../App'
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const city = r => require.ensure([], () => r(require('../page/city/city')),'city');
const miste = r => require.ensure([], () => r(require('../page/miste/miste')),'city')

export default new Router({
  mode:routerMode,
  strict:process.env.NODE_ENV !='production',
  routes: [
   {
     path:'/',
     component:APP,
     children:[
       // 首页城市列表页
       {
        path:'/home',
        component:home
       },
        //地址为空时跳转home页面
       {
        path:'',
        redirect:'/home'
       },
      //  搜索城市页
       {
        path:"/city/:cityid",
        component:city
       },
       {
        path:"/miste",
        component:miste
       }
     ]
   }
  ]
})
