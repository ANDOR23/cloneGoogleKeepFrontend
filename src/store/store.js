import { defineStore } from 'pinia';

export const titleHeaderStore = defineStore({
  id: 'title',
  state: () => ({
    title: 'Keep'
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
