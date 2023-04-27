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
        <button class="btn btn__sm btn__recolher" @click="recolherMenu">
            <span class="recolher__icone d-none"><i class="fa-solid fa-arrow-right"></i></span>
            <span class="recolher__texto"> Recolher menu</span>
        </button>
    </aside>
</template>

<script>

export default {
    data() {
        return {
            menuRecolhido: false
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('limparToken')
            this.$router.push('/login')
        },
        recolherMenu() {
            console.log('fecha')
        }
    }

}
</script>