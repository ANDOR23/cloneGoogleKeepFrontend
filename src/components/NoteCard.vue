<template>
    <q-card flat bordered class="my-card" @click="openModalNote">
        <div v-if="data.tittle || data.content === null">
            <q-card-section>
                <div class="text-h6 non-selectable">Nota vacía...</div>
            </q-card-section>
        </div>
        <div v-else>
            <q-card-section>
                <div class="text-h6 non-selectable">{{ data.title }}</div>
            </q-card-section>
            <q-card-section class="q-pt-none non-selectable">
                {{ data.content }}
            </q-card-section>
        </div>

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
    data() {
        return {
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