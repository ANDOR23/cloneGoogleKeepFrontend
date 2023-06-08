<template>
    <q-card flat bordered :class="`card-style ${bgColor}`" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <div v-if="data.title === null && data.content === null">
            <!-- ESTE TEXTO SE MUESTRA CUANDO SE LE HA ELIMINADO LA INFORMACIÓN AL CARD -->
            <q-card-section @click="openModalNote">
                <div class="text-h6 non-selectable">Nota vacía</div>
            </q-card-section>
        </div>
        <!-- EN CASO DE QUE HAYA INFORMACIÓN SE MUESTRA EL TÍTULO Y EL CONTENIDO DE LA MISMA 
            ADEMAS, AL COLOCAR EL CURSOR POR ENCIMA DEL CARD SE MUESTRAN ACCIONES QUE SE PUEDEN
            REALIZAR (ARCHIVAR, FIJAR, CAMBIAR COLOR DE FONDO)-->
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

        <div class="actionsCard" v-if="isHovered">
            <q-card-actions align="right">

                <q-btn flat round size="10px" @click="toggleDropdownColor">
                    <q-tooltip anchor="bottom middle" self="center middle">
                        Opciones de color
                    </q-tooltip>
                    <q-icon name="o_color_lens" />
                </q-btn>

                <q-card v-if="showDropdownColors" class="dropdownColors-Container">
                    <div @mouseleave="toggleDropdownColor" class="Colors-Container">
                        <q-btn :class="headerClasses" class="color-btn" round size="10px" icon="o_format_color_reset"
                            @click="changeColor('none')" />
                        <q-btn round size="10px" style="background-color: #b0c2f2;" @click="changeColor('lila')" />
                        <q-btn round size="10px" style="background-color: #fdcae1;" @click="changeColor('lightPink')" />
                        <q-btn round size="10px" style="background-color: #b8e4ff;" @click="changeColor('bluesky')" />
                        <q-btn round size="10px" style="background-color: #eaffc2;" @click="changeColor('lime')" />
                        <q-btn round size="10px" style="background-color: #e79eff;" @click="changeColor('lightViolet')" />
                    </div>
                </q-card>

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

                <q-btn flat round size="10px" @click="toggleDropdownMenu">
                    <q-tooltip anchor="bottom middle" self="center middle">
                        Más
                    </q-tooltip>
                    <q-icon name="more_vert" />
                </q-btn>
                
                <div @mouseleave="toggleDropdownMenu" class="dropdownMenu-container">
                    <q-btn v-if="showDropdownMenu" class="dropdownBtn" label="Borrar la nota" @click="deleteNote"></q-btn>
                </div>
            </q-card-actions>
        </div>

        <ModalNote :show-dialog="showModalNote" :data="data" @update:show-dialog="showModalNote = $event" />
    </q-card>
</template>

<script>
import { notesStore } from "src/stores/dataStore"
import { defineComponent } from "vue"

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
            /* SE CONFIGURAN VARIABLES QUE CONTROLAN EL COMPORTAMIENTO DEL CARD (MOSTRAN EL MODAL
            MOSTRAR UN DROPDOWN, SI EL CURSOR ESTA ENCIMA, Y EL COLOR DEL CARD) */
            showModalNote: false,
            isHovered: false,
            showDropdownMenu: false,
            showDropdownColors: false,
            bgColor: this.data.color
        }
    },
    setup() {
        const noteData = notesStore();

        return {
            noteData,
        }
    },
    methods: {
        /* LAS PRIMERA FUNCIONES SE ENCARGAN DEL COMPORTAMIENTO QUE OCURRE EN CADA CARD */
        changeColor(color) {
            this.bgColor = color;
            this.updateNote()
        },
        toggleDropdownColor() {
            this.showDropdownColors = !this.showDropdownColors
        },
        toggleDropdownMenu() {
            this.showDropdownMenu = !this.showDropdownMenu;
        },
        openModalNote() {
            this.showModalNote = true;
        },
        updateModal(value) {
            this.showModalNote = value;
        },
        /* ESTAS SON PETICINES QUE SE PUEDEN HACER AL INTERACTUAR CON EL CARD */
        async deleteNote() {
            try {
                const response = await deleteNote(this.data.id);
                const dataStore = notesStore();
                this.data.archived === 0 ? dataStore.setData(response.data) : dataStore.setArchivedNotes(response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async archiveNote() {
            try {
                const response = await this.noteData.archiveNote(this.data.id)
                const dataStore = notesStore();
                dataStore.setData(response.data)
                this.archiveNotify()
            } catch (error) {
                console.log(error);
            }
        },
        setPin() {
            this.data.pinned = this.data.pinned === 0 ? 1 : 0;
            this.unarchiveNote()
        },
        unarchiveNote() {
            this.data.archived = 0
            console.log('aquiencard', this.data.archived);
            this.updateNoteForUnarchive(this.data.id, this.data.title, this.data.content, this.data.pinned, this.data.archived, this.bgColor, this.deleted)
        },
        async updateNoteForUnarchive() {
            try {
                const response = await this.noteData.updateNote(this.data.id, this.data.title, this.data.content, this.data.pinned, this.data.archived, this.bgColor, this.deleted)
                const dataStore = notesStore();
                dataStore.setData(response.data)
                dataStore.setArchivedNotes(response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async updateNote() {
            try {
                const response = await this.noteData.updateNote(this.data.id, this.data.title, this.data.content, this.data.pinned, this.data.archived, this.bgColor, this.deleted)
                const dataStore = notesStore();
                dataStore.setData(response.data)
                this.getData
                this.archive === 0 ? dataStore.setData(response.data) : dataStore.setArchivedNotes(response.data)
            } catch (error) {
                console.log(error);
            }
        },
    }

})
</script>
