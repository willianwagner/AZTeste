<template>
    <header class="d-flex justify-between align-items-center p-2">
        <div>
            <span class="path__principal">{{ pathAtual}} </span>
            <span v-if="pathAtual"> /</span>
              {{ this.$router.currentRoute.value.name }}
        </div>
   
     <div>User</div>
    </header>
</template>
<script>
export default ({
  data() {
    return {
    
    }
  },
  computed:{
    pathAtual(){
        return this.$router.currentRoute.value.path.replace(/\//g, "");
    }
  }
  
  })
</script>
