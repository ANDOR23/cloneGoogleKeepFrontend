<template >
  <q-page>
    <!-- NEWNOTE ES UN INPUT QUE VERIFICA SI SE LE HA HECHO CLICK O NO, EN CASO QUE SÍ
        SE DECPLIEGA UN FORMULARIO PARA INGRESAR UN NUEVO REGISTRO -->
    <NewNote class="newNotes-style" v-if="data.getSearch?.length == 0" />
    <!-- AVISO QUE SE DESPLIEGA EN CASO DE NO HABER DATA -->
    <div class="notFound text-h6" v-if="notes.data?.length === 0 && data.getSearch?.length == 0">
      <q-icon name="o_lightbulb" size="120px" />
      <p>Las notas que agregues aparecerán aquí</p>
    </div>
    <!-- AVISO QUE SE DESPLIEGA EN CASO DE NO HABER COINCIDENCIAS EN LA BÚSQUEDA -->
    <div class="notFound text-h6" v-if="notes.data?.length === 0 && data.getSearch?.length !== 0">
      <p>No hay resultados que coincidan.</p>
    </div>
    <!-- ESTE ES EL CONTENEDOR DE LAS TARJETAS QUE ESTEN CONFIGURADAS COMO FIJADAS -->
    <div class="card-container" v-else-if="pinnedNotes?.length !== 0">
      <div class="pinned-container">
        <p class="text-h9 sectionPinOther">FIJADAS</p>
        <NoteCard v-for="note in pinnedNotes" :key="note.id" :data="note" />
      </div>
      <!-- ESTE ES EL CONTENEDOR DE LAS TARJETAS QUE ESTEN NO CONFIGURADAS COMO FIJADAS -->
      <div class="notPinned-container">
        <p class="text-h9 sectionPinOther">OTRAS</p>
        <NoteCard v-for="note in notPinnedNotes" :key="note.id" :data="note" />
      </div>
      <!-- EN CASO DE NO TENER TARJETAS FIJADAS SE MUESTRA LA DATA COMPLETA DENTRO DE ESTE
          CONTENEDOR -->
    </div>
    <div class="card-container" v-else>
      <NoteCard class="card" v-for="item in notes.data" :key="item?.id" :data="item" />
    </div>
  </q-page>
  <!-- SELECTOR DE PAGINAS PARA NAVEGAR POR TODA LA DATA OBTENIDA -->
  <div>
    <q-pagination v-if="notes.data?.length !== 0" class="pagination" v-model="currentPage" :max="totalPages - 2"
      @click="changePage" input />
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
