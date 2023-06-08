<template>
    <q-card style="background-color: $pink-light;" flat bordered class="card-style" @mouseenter="isHovered = true"
        @mouseleave="isHovered = false">
        <div v-if="data.title === null && data.content === null">
            <q-card-section @click="openModalNote">
                <div class="text-h6 non-selectable">Nota vacía</div>
            </q-card-section>
        </div>
        <div v-else>
            <div class="titlexpin">
                <q-card-section class="textTitle text-h6" @click="openModalNote">
                    {{ data.title }}
                </q-card-section>
                <q-btn flat round class="pin-btn" v-if="isHovered">
                    <q-tooltip v-if="data.pinned === 0" anchor="bottom middle" self="center middle">
                        Fijar la nota
                    </q-tooltip>
                    <q-tooltip v-else anchor="bottom middle" self="center middle">
                        Dejar de fijar nota
                    </q-tooltip>
                    <q-icon v-if="data.pinned === 0" name="o_push_pin" v-model="pin" @click="setPin" />
                    <q-icon v-else name="push_pin" v-model="pin" @click="setPin" />
                </q-btn>
            </div>

            <q-card-section class="text" @click="openModalNote">
                {{ data?.content }}
            </q-card-section>
        </div>
        <div class="actionsCard">
            <q-card-actions align="right" v-if="isHovered">

                <q-btn flat round size="10px">
                    <q-tooltip anchor="bottom middle" self="center middle">
                        Opciones de color
                    </q-tooltip>
                    <q-icon name="o_color_lens" />
                </q-btn>
                <q-btn flat round size="10px">
                    <q-tooltip v-if="data.archived === 0" anchor="bottom middle" self="center middle">
                        Archivar
                    </q-tooltip>
                    <q-tooltip v-else anchor="bottom middle" self="center middle">
                        Eliminar del archivo
                    </q-tooltip>
                    <q-icon v-if="data.archived === 0" name="o_archive" @click="archiveNote" v-model="archive" />
                    <q-icon v-else name="o_unarchive" @click="unarchiveNote" v-model="archive" />
                </q-btn>

                <q-btn-dropdown flat size="10px" no-icon-animation rounded dropdown-icon="more_vert">
                    <template v-slot:label>
                        <q-tooltip anchor="bottom middle" self="center middle">
                            Más
                        </q-tooltip>
                    </template>
                    <q-item v-close-popup @click="deleteNote">
                        <q-item-section>
                            <q-item-label>Borrar nota</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-btn-dropdown>
            </q-card-actions>
        </div>
        <ModalNote :show-dialog="showModalNote" :data="data" @update:show-dialog="showModalNote = $event" />
    </q-card>
</template>

<script>
import { notesStore } from "src/stores/dataStore"
import { defineComponent, ref } from "vue"
import ModalNote from "./ModalNote.vue"
import { deleteNote } from "src/boot/axiosActions"

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
            showModalNote: false,
            isHovered: false
        }
    },
    setup() {
        const noteData = notesStore();
        return { noteData }
    },
    methods: {
        openModalNote() {
            this.showModalNote = true;
        },
        updateModal(value) {
            this.showModalNote = value;
        },
        async deleteNote() {
            try {
                const response = await deleteNote(this.data.id);
                const dataStore = notesStore();
                this.archive === 0 ? dataStore.setData(response.data) : dataStore.setArchivedNotes(response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async archiveNote() {

            try {
                const response = await this.noteData.archiveNote(this.data.id)
                const dataStore = notesStore();
                dataStore.setData(response.data)
            } catch (error) {
                console.log(error);
            }
        },
        setPin() {
            this.data.pinned = this.data.pinned === 0 ? 1 : 0;
        },
        unarchiveNote() {
            this.data.archived = 0
            console.log('aquiencard', this.data.archived);
            this.updateNoteForUnarchive(this.data.id, this.data.title, this.data.content, this.data.pinned, this.data.archived)
        },
        async updateNoteForUnarchive() {
            try {
                const response = await this.noteData.updateNote(this.data.id, this.data.title, this.data.content, this.data.pinned, this.data.archived)
                const dataStore = notesStore();
                dataStore.setData(response.data)
                dataStore.setArchivedNotes(response.data)
            } catch (error) {
                console.log(error);
            }
        }
    }

})
</script>