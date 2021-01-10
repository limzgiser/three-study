<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->

 <div id='nav'>
  <router-link to='/'>Earth</router-link>
  <router-link to='/tank'>Tank </router-link>
 </div>

 <router-view ></router-view>
</template>

<script>
// import Scene from './pages/Scene'

export default {
  name: 'App',
  components: {
    // Scene
  }
}
</script>

<style >
 html,body{
  margin: 0;
  padding: 0;
 }
 #nav{
  position: absolute;
  top: 20px;
  left: 20px;
  height: 50px;
  display:flex;
  align-items: center;
  color: #fff;
  background: #ffffff;
  width: 520px;
  justify-content: space-around;
 }
 router-link{
  margin-right: 20px;;
 }

</style>
