import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import httpClient from '@/constants/http'


export const useCounterStore = defineStore('counter',{

    state() {
        return {
            count: 0
        }
    },

    actions:{
        increment(){
            this.count++;
        }
    },

    getters:{
      async showCount():Promise<number>{
        const response = await httpClient.get('/users?page=2')
        console.log(response.data)
            return this.count;
        }
    }
})
