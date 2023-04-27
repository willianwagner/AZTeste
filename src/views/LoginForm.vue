<template>
  <div class="login__form">
    <div class="box__center">
      <div class="box__form">
        <div class="logo__az d-flex justify-center">
          <img alt="Logo AZ" class="imagem__fluida" src="@/assets/imgs/logo_az.png" />
          <div class="slogan__az">
            <p>
              Tecnologia em Gestão
            </p>
          </div>
        </div>
        <form @submit="login">
          <div class="box__input">
            <label for="usuario">Usuário</label>
            <input type="email" name="usuario" v-model="form.email" placeholder="Informe o usuário" required>

          </div>
          <div class="box__input">
            <label for="senha">Senha</label>
            <input type="password" name="password" v-model="form.password" placeholder="Informe a senha" required>
          </div>
          <div>
            <button class="btn btn__primary" type="submit" v-if="isLoad">Entrar</button>
            <LoadIcon v-else></LoadIcon>

          </div>
        </form>
      </div>

    </div>
  </div>
</template>
  
<script>

import httpClient from '@/constants/index'
import LoadIcon from '../components/atoms/LoadIcon.vue';

export default {
  name: 'LoginForm',
  components: {
    LoadIcon
  },
  data() {
    return {

      isLoad: true,
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    async login(event) {
      event.preventDefault();
      this.isLoad = !this.isLoad

      try {
        const response = await httpClient.post('/login', this.form);

        this.$store.dispatch('gravarToken', response.data.token)
        this.$router.push('/')

      } catch (error) {
        console.error(error);
        const notificacao = {
          tipo: 'danger',
          texto: 'Usuário e senha inválidos.'
        }

        this.$store.dispatch('notificarUsuario', notificacao)
        this.isLoad = !this.isLoad
      }

    }
  }

}
</script>
<style scoped>
.logo__az {
  height: 40px;

}

.slogan__az {
  display: flex;
  align-items: center;
  font-size: large;
  font-weight: bold;
}

.login__form {
  height: 100vh;
  margin: 0;
}

.box__center {
  height: 100%;
  display: grid;
  grid-template-columns: 400px;
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;
  grid-gap: 1rem;
}

.box__form {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  justify-items: center;
}

.box__input {
  position: relative;

}

form {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 400px;
  padding: 3rem;
}



</style>