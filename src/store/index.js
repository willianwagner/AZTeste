import { createStore } from 'vuex'

export default createStore({
  state: {
    token:'a',
    paginacao:[]
  },
  getters: {
  },
  mutations: {
    updateToken(state,data){
      state.token = data
    console.log('agora vai',data)
    }
  },
  actions: {
  },
 
})
