<template>
    <q-page class="flex column">
        <div class="flex wrap´row justify-evenly q-pa-md q-border-dark">
            <NoteCard v-for="item in data" :key="item.id" :data="item" />
        </div>
    </q-page>
</template>

<script>
import { getArchivedNotes } from 'src/boot/axiosActions';
import NoteCard from 'src/components/NoteCard.vue';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
    name: 'ArchivedNotes',
    components: {NoteCard},
    setup() {
        let data = ref([]);
        onMounted(async () => {
            await getArchivedNotes().then((response) => {
                data.value = response.value
            })
        })
        return { 
            data 
        }
    }
})
</script>