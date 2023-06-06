import { defineStore } from 'pinia';

export const titleHeaderStore = defineStore('title',{
  state: () => ({
    title: ''
  }),
  getters: {
    getTitle() {
      return this.title
    }
  },
  actions: {
    setTitle(title){
      this.title = title
    }
  }
})
