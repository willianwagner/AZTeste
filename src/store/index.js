import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    auth: false,
    paginacao: [],
    notificacao: []
  },
  getters: {
    isAuth(state) {
      return state.auth
    },
    getNotificacoes(state) {
      return state.notificacao
    }
  },
  mutations: {
    updateToken(state, data) {
      state.token = data
    },

    isLogggedIn(state) {
      state.auth = false
      if (state.token.length)
        state.auth = true

    },

    gravaNotificacao(state, data) {
      state.notificacao.push(data)
      setTimeout(() => {
        state.notificacao = state.notificacao.filter(notificacao => notificacao.id != data.id)
      }, 3000)
    },

    limpaNotificacao(state, data) {
      state.notificacao = state.notificacao.filter(notificacao => notificacao.id != data)
    }
  },
  actions: {
    gravarToken({ commit }, data) {
      commit('updateToken', data)
      commit('isLogggedIn')

    },

    notificarUsuario({ commit }, data) {
      data.id = new Date().getTime()
      commit('gravaNotificacao', data)
    },

    limparNotificacoes({ commit }, data) {
      commit('limpaNotificacao', data)
    }

  },

})
