import { defineStore } from 'pinia';

export const titleHeaderStore = defineStore('title',{
  state: () => ({
    title: 'sss'
  }),
  actions: {
    setTitle(titleHeader){
      this.title = titleHeader
    }
  }
})
