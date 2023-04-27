<template>
    <aside>
        <div class="sidebar">
            <div class="d-flex justify-center">
                <div class="area__logo">
                    <img alt="Logo AZ" class="imagem__fluida" src="@/assets/imgs/logo_az_white.png" />
                </div>
            </div>
            <ul class="menu">
                <li>
                    <router-link to="/candidatos" class="link">
                        <i class="fa fa-users" aria-hidden="true"></i>
                        <span class="descricao__link"> Candidatos</span>
                    </router-link>

                </li>
                <li>
                    <router-link to="/">
                        <i class="fa fa-inbox" aria-hidden="true"></i>
                        <span class="descricao__link"> Menu Vazio</span>
                    </router-link>
                </li>
                <li>
                    <a role="button" @click="logout()">
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                        <span class="descricao__link"> Sair</span>
                    </a>
                </li>

            </ul>
        </div>
    </aside>
</template>

<script>

export default {
   
    methods: {
        logout() {
            this.$store.dispatch('limparToken')
            this.$router.push('/login')
        }
    }

}
</script>