import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import httpClient from '@/constants/http'


export const useUserStore = defineStore('user',{

    state: () => ({
        users: [],
    }),
    getters: {
        getUsers(state){
            return state.users
          }
      },
      actions: {
        async fetchUsers() {
          try {
            const data = await httpClient.get('/users')
            this.users = data.data
            
            }
            catch (error) {
              alert(error)
              console.log(error)
          }
        }
      },
})
