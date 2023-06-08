import { defineStore } from 'pinia';
import { getAllNotes, getArchivedNotes, changePage, setNote, updateNote, deleteNote, archiveNote } from 'src/boot/axiosActions';

export const notesStore = defineStore('notesStore', {
  state: () => ({
    notes: [],
    archivedNotes: [],
    totalpages: 0,
    searchQuery: '',
    originalNotes: [],
    mergedNotes: [],
    pinnedNotes:[]
  }),
  getters:{
    getSearch(state){
      return state.searchQuery
    },
    getData(state){
      return state.mergedNotes
    }
  },
  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
      if (!this.searchQuery) {
        this.setData()
        return this.notes;
      }
      const querySearch = this.searchQuery.toLowerCase()
      const filteredData = this.mergedNotes.filter(item => {
        return (
          item?.title?.toLowerCase().includes(querySearch) ||
          item?.content?.toLowerCase().includes(querySearch)
        )
      })
      if (filteredData != null) {
        this.notes.data = filteredData
        return this.notes
      }else{
        this.notes = null
        return this.notes
      }
    },
    async setData() {
      try {
        const response = await getAllNotes();
        this.notes = response.value
        this.originalNotes = response.value
        this.mergedNotes = [...this.notes.data, ...this.archivedNotes.data]
        this.totalpages = response.value.links.length
      } catch (error) {
        console.log(error);
      }
    },
    async setArchivedNotes() {
      try {
        const response = await getArchivedNotes();
        this.archivedNotes = response.value
        this.totalpages = response.value.links.length
      } catch (error) {
        console.log(error);
      }
    },
    async changeArchivedPage(archived, page) {
      try {
        const response = await changePage(archived, page);
        this.archivedNotes = response.value
      } catch (error) {
        console.log(error);
      }
    },
    async changePage(archived, page) {
      try {
        const response = await changePage(archived, page);
        this.notes = response.value
      } catch (error) {
        console.log(error);
      }
    },
    async setNewNote(title, content, pin, archive, color) {
      try {
        const response = await setNote(title, content, pin, archive, color)
        return response.data
      } catch (error) {
        console.log(error);
      }
    },
    async updateNote(id, title, content, pin, archive, color) {
      try {
        const response = await updateNote(id, title, content, pin, archive, color)
        return response.data
      } catch (error) {
        console.log(error);
      }
    },
    async archiveNote(id) {
      try {
        const response = await archiveNote(id)
        return response.data
      } catch (error) {
        console.log(error);
      }
    },
    async deleteNote(id) {
      try {
        await deleteNote(id)
      } catch (error) {
        console.log(error);
      }
    }
  },
});