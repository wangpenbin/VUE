<template lang="html">
    <div>
        <div>
            <div><span>附近商家</span></div>
            <div>
                <ul>
                    <li>
                        <div>
                            <img src="" alt="">
                            <div>

                            </div>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {
    data(){
        return{
             imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
             
        }
    },
    props:['foodTypes'],
    mounted(){
        console.log(this.foodTypes)
       
    },
    methods:{
       
        getCategoryId(url){
    		let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
    		if (/restaurant_category_id/gi.test(urlData)) {
    			return JSON.parse(urlData).restaurant_category_id.id
    		}else{
    			return ''
    		}
    	}
    }
}
</script>
<style scoped>
   
</style>
