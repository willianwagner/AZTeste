import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      data: {},
      token: ''
    },
    paginacao: [],
    notificacao: []
  },
  getters: {
    isAuth(state) {
      let user = localStorage.getItem('user')
      if (user) {
        state.user = JSON.parse(user)
      }
      return !!state.user.token
    },
    getNotificacoes(state) {
      return state.notificacao
    }
  },
  mutations: {
    updateToken(state, data) {
      state.user.token = data
      localStorage.setItem('user', JSON.stringify(state.user))
    },

    limpaToken(state) {
      console.log(state,'mut')
      state.user = {}
      localStorage.removeItem('user');      
    },

    gravaNotificacao(state, data) {
      state.notificacao.push(data)
     
    },

    limpaNotificacao(state, data) {
      state.notificacao = state.notificacao.filter(notificacao => notificacao.id != data)
    }
  },
  actions: {
    gravarToken({ commit }, data) {
      commit('updateToken', data)

    },

    notificarUsuario({ commit }, data) {
      data.id = new Date().getTime()
      commit('gravaNotificacao', data)
      
      setTimeout(() => {
        commit('limpaNotificacao', data.id)
      }, 3000)
    },

    limparNotificacoes({ commit }, data) {
      commit('limpaNotificacao', data)
    },

    limparToken({commit}){
      commit('limpaToken')
    }

  },

})