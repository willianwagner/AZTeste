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
                    <router-link to="/" >
                        <i class="fa fa-inbox" aria-hidden="true"></i>
                        <span class="descricao__link"> Menu Vazio</span>
                    </router-link>
                </li>

            </ul>
        </div>
    </aside>
</template>

<style scoped>
.area__logo {
    width: 50%;
    padding-top: 20px;
}

.sidebar {
    width: 100%;
    top: 0;
    left: 0;
    overflow-y: auto;
}

.menu {
    list-style: none;
    margin: 25px 0;
    padding: 0;
    text-align: left;
}

.menu li {
    border-bottom: 1px solid #ddd;
    position: relative;
    border-bottom: none;

}

.menu li:last-child {
    border-bottom: none;
}

.menu a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #fff;
}

.menu a:hover {
    background-color: #035087;
}

.menu i {
    margin-right: 10px;
}

.link {
    color: #fff;
}

.link:hover {
    background-color: #035087;
}

.link.router-link-active {
    background-color: #035087;
}

.link.router-link-active::before {
    content: "";
    position: absolute;
    right: 0;
    top: 33%;
    bottom: 0;
    width: 10px;
    height: 15px;
    background-color: #fff;
}</style>