<template>
    <q-card flat bordered class="my-card" @click="openModalNote">
        <q-card-section>
            <div class="text-h6">{{ data.title }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
            {{ data.content }}
        </q-card-section>
        <ModalNote :show-dialog="showModalNote" :data="data" @update:show-dialog="showModalNote = $event" />
    </q-card>
</template>

<script>
import { defineComponent, ref } from "vue"
import ModalNote from "./ModalNote.vue"

export default defineComponent({
    name: 'NoteCard',
    components: { ModalNote },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            showModalNote: false
        }
    },
    methods: {
        openModalNote() {
            this.showModalNote = true;
        },
        updateModal(value) {
            this.showModalNote = value;
        }
    }

})
</script>