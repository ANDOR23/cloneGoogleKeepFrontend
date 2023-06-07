<template class="container">
  <q-page>
    <NewNote class="newNotes-style" v-if="data.getSearch.length == 0" />
    <div class="notFound text-h6" v-if="notes.data?.length === 0">

      <p class="notFound">No hay resultados que coincidan.</p>
    </div>
    <div class="card-container" v-else>
      <div>
        <p class="text-h9">FIJADAS</p><br>
        
          <NoteCard v-for="note in pinnedNotes" :key="note.id" :data="note" />
        
      </div>
      <div>
        <p class="text-h9">otras</p><br>
        
          <NoteCard v-for="note in notPinnedNotes" :key="note.id" :data="note" />
        
      </div>


      <!-- <NoteCard class="card" v-for="item in notes.data" :key="item?.id" :data="item" /> -->
      
    </div>
  </q-page>
  <div>
    <q-pagination class="pagination" v-model="currentPage" :max="totalPages - 2" @click="changePage" input />
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
      data.setArchivedNotes();
      data.setData();
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
  computed: {
    pinnedNotes() {
      return this.notes.data?.filter(note => note?.pinned === 1)
    },
    notPinnedNotes() {
      return this.notes.data?.filter(note => note?.pinned === 0)
    }
  },
  methods: {
    changePage() {
      this.data.changePage('', this.currentPage)
    }
  }
})
</script>
