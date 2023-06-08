/* ESTE STORE SE ENCAGA DE MODIFICAR EL TÍTULO DEL HEADER PARA INDICAR EN QUÉ PARTE DE LA APLICACIÓN SE LOCALIZA EL USUARIO */
import { defineStore } from 'pinia';

export const titleHeaderStore = defineStore('title',{
  state: () => ({
    title: 'Keep'
  }),
  getters:{
    /* SE RETORNA EL VALOR DEL ESTADO */
    getTitle(state){
      return state.title
    }
  },
  actions: {
    /* SE ESTABLECE EL VALOR RECIBIDO */
    setTitle(titleHeader){
      this.title = titleHeader
    }
  }
})
