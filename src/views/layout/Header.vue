<template>
  <div class="headerBox">
    <header>
      <div v-for="(item,index) in list" :class="item.class" :key='index' @click="select(index)">
        <router-link :to="item.url" href="#" id="">{{item.title}}</router-link>
      </div>
    </header>
  </div>
</template>

<script>
// 引入jq
import $ from 'jquery'

export default {
  data () {
    return {
      list:[
        {title:'景点',class:'changeColor',url:'/',show:true},
        {title:'演艺',class:'',url:'/perform',show:false},
        {title:'餐饮',class:'',url:'/repast',show:false},
        {title:'客服中心',class:'',url:'/serviceCenter',show:false},
        {title:'出入口',class:'',url:'/inAndOut',show:false},
        {title:'卫生间',class:'',url:'/wcRoom',show:false}
      ]
    };
  },

  computed: {
    
  },

  beforeMount() {},

  mounted() {},

  methods: {
    select(index){
      this.list.forEach(e => {
        e.class=''
      });
      sessionStorage.setItem('key',false);
      this.list.show = sessionStorage.getItem('key')
      // this.list[index].show = true
      this.list[index].class='changeColor'
      // let a = Math.floor(Math.random()*max)+1;
      // console.log(a)
    }
  },

  watch: {}
}

</script>
<style scoped>
.changeColor{
  border-bottom:2px solid red;
}
div{
  width: 100%;
  z-index: 99;
  background: white;
  position: relative;
}
header{
  width: 100%;
  height: 20%;
  font-size: 0;
  display: -webkit-box;
  display:flex;
  -webkit-flex-wrap:nowrap;
  -ms-flex-wrap:nowrap;
  flex-wrap:nowrap;
  -webkit-box-pack:justify;
  -webkit-justify-content:space-between;
  -ms-flex-pack:justify;
  justify-content:space-between;
}



header>div{
  width: 25%;
  font-size: 0;
  /* display: inline-block; */
}
header>div>a{
  color: black;
  font-size: 1.2rem;
  line-height: 3.4rem;
}

</style>