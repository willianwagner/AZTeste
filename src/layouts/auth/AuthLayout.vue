<template>
    <div class="container__auth">
       <HeaderAuth></HeaderAuth>
        <SidebarAuth></SidebarAuth>
        <main>
            <router-view />
        </main>
        <FooterAuth></FooterAuth>
    </div>
</template>
<script>
import HeaderAuth from '@/components/organisms/HeaderAuth.vue';
import SidebarAuth from '@/components/organisms/SidebarAuth.vue';
import FooterAuth from '@/components/organisms/FooterAuth.vue';

export default {
    components:{
        HeaderAuth,
        SidebarAuth,
        FooterAuth,
    },

    data() {
        return {}
    },
    methods: {
        
    }

}
</script>
