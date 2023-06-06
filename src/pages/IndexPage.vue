<template>
  <q-page class="flex column">
    <NewNote />
    <div v-if="notes.data?.length === 0" class="flex wrap row justify-evenly q-pa-md q-border-dark">
      <p>No hay resultados que coincidan.</p>
    </div>
    <div v-else class="flex wrap row justify-evenly q-pa-md q-border-dark">
      <NoteCard v-for="item in notes.data" :key="item?.id" :data="item" />
    </div>
  </q-page>
  <div class="q-pa-lg flex flex-center">
    <q-pagination v-model="currentPage" :max="totalPages - 2" @click="changePage" input />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import NoteCard from 'src/components/NoteCard.vue';
import NewNote from 'src/components/NewNote.vue';
import { notesStore } from 'stores/dataStore'

export default defineComponent({
  name: 'IndexPage',
  components: { NoteCard, NewNote },

  setup() {
    const data = notesStore();

    const currentPage = ref(1)
    const totalPages = computed(() => {
      return data.totalpages
    })
    const notes = computed(() => {
      return data.notes
    })
    onMounted(() => {
      data.setData();
      data.setArchivedNotes();//se obtiene la data de las notas archivadas para poder hacer la busqueda de todas las notas agregadas
    });
    watch(
      () => data.notes,
      (newNotes) => {
        notes.value = newNotes;
      }
    );
    return {
      currentPage,
      totalPages,
      data,
      notes,
    }
  },
  methods: {
    changePage() {
      this.data.changePage('', this.currentPage)
    }
  }
})
</script>
