import { defineStore } from 'pinia';

export const titleHeaderStore = defineStore('title',{
  state: () => ({
    title: 'Keep'
  }),
  getters:{
    getTitle(state){
      return state.title
    }
  },
  actions: {
    setTitle(titleHeader){
      console.log(titleHeader);
      this.title = titleHeader
    }
  }
})
