<template>
    <q-page class="flex column">
        <div class="flex wrap row justify-evenly q-pa-md q-border-dark">
            <NoteCard v-for="item in notes.data" :key="item?.id" :data="item" />
        </div>
        <div class="q-pa-lg flex flex-center">
            <q-pagination v-model="currentPage" :max="totalPages - 2" @click="changePage" input />
        </div>
    </q-page>
</template>

<script>
import NoteCard from 'src/components/NoteCard.vue';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { notesStore } from 'src/stores/dataStore';
import { titleHeaderStore } from 'src/stores/titleStore'

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
        watch(
            () => data.notes,
            (newNotes) => {
                notes.value = newNotes;
            }
        );
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