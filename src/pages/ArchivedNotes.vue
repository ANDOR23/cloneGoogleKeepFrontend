<template>
    <q-page>
        <div class="notFound text-h6" v-if="notes.data?.length === 0">
            <q-icon name="o_archive" size="120px" />
            <p>Tus notas archivadas aparecerán aquí</p>
        </div>

        <div class="card-container">
            <NoteCard v-for="item in notes.data" :key="item?.id" :data="item" />
        </div>
        
        <div v-if="notes.data?.length !== 0">
            <q-pagination class="pagination" v-model="currentPage" :max="totalPages - 2" @click="changePage" input />
        </div>
    </q-page>
</template>

<script>
import NoteCard from 'src/components/NoteCard.vue';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { notesStore } from 'src/stores/dataStore';

export default defineComponent({
    name: 'ArchivedNotes',
    components: { NoteCard },
    setup() {
        const data = notesStore();
        const currentPage = ref(1)
        const totalPages = computed(() => {
            return data.totalpages
        })
        const notes = computed(() => {
            return data.archivedNotes
        })
        onMounted(async () => {
            data.setArchivedNotes()
        })
        return {
            totalPages,
            notes,
            currentPage,
            data
        }
    },
    methods: {
        changePage() {
            this.data.changeArchivedPage('/archived', this.currentPage)
        }
    }
})
</script>