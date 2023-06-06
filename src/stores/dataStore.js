import { defineStore } from 'pinia';
import { getAllNotes, getArchivedNotes, changePage, setNote, updateNote, deleteNote } from 'src/boot/axiosActions';

export const notesStore = defineStore('notesStore',{
  state: () => ({
    notes: [],
    archivedNotes: [],
    totalpages: 0,
    searchQuery: ''
  }),
  getters:{
    getData(state){
      return state.notes
    },
    filteredNotes() {
      if (!this.searchQuery) {
        return this.data;
      }

      const query = this.searchQuery.toLowerCase();
      return this.data.filter((note) => {
        return (
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
        );
      });
    },
  },
  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    async setData() {
      try {
        const response = await getAllNotes();
        this.notes = response.value
        this.totalpages = response.value.links.length
      } catch (error) {
        console.log(error);
      }
    },
    async setArchivedNotes(){
      try {
        const response = await getArchivedNotes();
        this.archivedNotes = response.value
        console.log('desde store',this.archivedNotes);
        this.totalpages = response.value.links.length
      } catch (error) {
        console.log(error);
      }
    },
    async changeArchivedPage(archived ,page) {
      try {
        const response = await changePage(archived, page);
        this.archivedNotes = response.value
        console.log('desdechangepage', this.archivedNotes);
      } catch (error) {
        console.log(error);
      }
    },
    async changePage(archived, page) {
      try {
        const response = await changePage(archived, page);
        this.notes = response.value
        console.log('desdechangepage', this.notes);
      } catch (error) {
        console.log(error);
      }
    },
    async setNewNote(title, content, pin, archive){
      try {
        const response = await setNote(title, content, pin, archive)
        console.log(response.data);
        return response.data
      } catch (error) {
        console.log(error);
      }
    },
    async updateNote(id, title, content, pin, archive){
      try {
        const response = await updateNote(id, title, content, pin, archive)
        console.log(response.data)
        return response.data
      } catch (error) {
        console.log(error);
      }
    },
    async deleteNote(id){
      try {
        await deleteNote(id)
      } catch (error) {
        console.log(error);
      }
    }
  },
});