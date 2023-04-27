<template>
    <header class="d-flex justify-between align-items-center p-2">
        <div class="breadcrumb">
            <span class="path__principal">{{ pathAtual }} </span>
            <span v-if="pathAtual"> / </span>
            {{ this.$router.currentRoute.value.name }}
        </div>
        <div class="d-flex align-items-center justify-space-around px-2">
            <span class="px-2">Karen</span>
            <i class="fa fa-user-circle fa-2x" aria-hidden="true"></i>
        </div>
    </header>
</template>
<script>
export default ({   
    computed: {
        pathAtual() {
            return this.$router.currentRoute.value.path.replace(/\//g, "") || 'Início';
        }
    }

})
</script>
