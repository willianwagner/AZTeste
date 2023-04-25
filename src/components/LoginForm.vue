<template>
  <div class="box__center">
    <div class="box__form">
      <h2>AZ Tecnologia em Gestão</h2>
      <form @submit="login">
        <div class="box__input">
          <label for="usuario">Usuário</label>
          <input type="email" name="usuario" :value="form.email" placeholder="Informe o usuário" required>

        </div>
        <div class="box__input">
          <label for="senha">Senha</label>
          <input type="password" name="password" :value="form.password" placeholder="Informe a senha" required>
        </div>

        <button type="submit" v-if="isLoad">Entrar</button>
        <LoadIcon v-else></LoadIcon>
      </form>

    </div>

  </div>
</template>
  
<script>

import httpClient from '@/constants/index'
import LoadIcon from './LoadIcon.vue';
//import NotificacaoFlag from '@/components/NotificacaoFlag.vue' 
export default {
  name: 'LoginForm',
  components: {
    LoadIcon
  },
  data() {
    return {
      isLoad: true,
      form: {
        email: 'eve.holt@reqres.in',
        password: '123'
      }
    }
  },
  created() {

  },
  methods: {
    async login(event) {
      event.preventDefault();
      const escopo = this
      escopo.isLoad = !escopo.isLoad

      try {
        const response = await httpClient.post('/login', escopo.form);
        this.$store.dispatch('gravarToken', response.data.token)
        this.$router.push('home')

      } catch (error) {
        console.error(error);
        const notificacao = {
          tipo: 'danger',
          texto: 'Usuário e senha inválidos.'
        }

        this.$store.dispatch('notificarUsuario', notificacao)
        escopo.isLoad = !escopo.isLoad
      }
     
    }
  }

}
</script>
<style scoped>
.box__center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.box__input {
  position: relative;

}

form {
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 50px;
  width: 400px;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: #0077ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0055cc;
}

label {
  float: left;
  padding: 10px 0;
  margin: 0;
  font-size: 18px;
  color: #5e5e5e;
  pointer-events: none;
  transition: 0.5s;
}

input {
  width: 100%;
  margin-top: 15px;
  padding: 10px 0;
  margin: 5px 0;
  border: none;
  border-bottom: 2px solid #5e5e5e;
  outline: none;
  font-size: 18px;
  color: #5e5e5e;
  background: transparent;
}

input::placeholder {
  color: #c2c2c2;
}
</style>