<template>
    <div>
        layout do auth<br />
        <router-link to="/about">About</router-link><br />
        <router-link to="/">Home</router-link><br />
        <button type="button" @click="logout()">Sair</button>

        <router-view />

    </div>
</template>
<script>
export default {
    
    data(){
        return{}
    },
    methods:{
        logout(){
          
            this.$store.dispatch('limparToken')
            this.$router.push('/login')
        }
    }
    
  }
  </script>
