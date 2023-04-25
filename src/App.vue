<template>
 <NotificacaoFlag />
  <router-view/>
</template>

<script>
import NotificacaoFlag from './components/NotificacaoFlag.vue';
export default {
  components:{
    NotificacaoFlag
  }
  
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
  background: #e2e2e2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;


}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
