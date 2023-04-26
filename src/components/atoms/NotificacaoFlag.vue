<template>
    <article class="alert" :class="tipoNotificacao[notificacao.tipo]" v-for="notificacao in notificacoes" :key="notificacao.id">
      <div class="">
        {{ notificacao.texto }}
      </div>
      <div>
        <button class="close__alert" type="button" @click="close(notificacao.id)">x</button>
      </div>
    </article>
</template>

<script >
import { computed, defineComponent } from "vue";
import { useStore } from 'vuex';


export default defineComponent({
  name: "NotificacaoFlag",
  data() {
    return {
      tipoNotificacao:{
        'success' : 'alert__success',
        'info' : 'alert__info',
        'danger' : 'alert__danger',
      }
    }
  },
  methods:{
    close(id){    
      this.$store.dispatch('limparNotificacoes',id)
    }
  },
  setup() {
    const store = useStore(); 
    return {
      notificacoes: computed(() => store.state.notificacao),
    };
  },
});
</script>

<style scoped>
.alert {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  font-size: 1rem;
  position: absolute;
  top: 5%;
  right: 5%;
  display: flex;
  justify-content: space-between;
  width: 20%;

}

.alert__info {
  color: #0c5460;
  background-color: #d1ecf1;
  border-color: #bee5eb;
}

.alert__success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.alert__danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.close__alert{
  border:none;
  background: transparent;
  cursor: pointer;
}
</style>