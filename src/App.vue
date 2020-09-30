<template>
  <div id="app">
    <router-view/>
    <div style="width:50px;height:50px"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components:{},
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
a,li{
  text-decoration: none;
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
.amap-copyright,.amap-logo{
  display: none!important;
}

/* 地点标注样式 */
.amap-marker-label{
  border: 0;
  padding: 0.4rem;
  border-radius: 5px;
  border: 1px solid bisque;
  color: rgb(70, 169, 220);
}

/* 信息窗体的样式修改 */
.amap-info-content{
  padding: 1rem 1.5rem;
  border-radius: 1.5rem;
}
.input-item{
  height: 2rem;
}

/* mint的样式 */
.mint-navbar .mint-tab-item{
  z-index: 9;
  background: white;
}


/* 音频 */
audio{
  z-index: 999999;
  position: absolute;
  left: 0;
  top: 200px;
}
</style>
