<template>
    <q-card style="background-color: ;" flat bordered class="card-style" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
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
                    <q-icon v-if="data.pinned=== 0" name="o_push_pin" v-model="pin" @click="setPin" />
                    <q-icon v-else name="push_pin" v-model="pin" @click="setPin" />
                </q-btn>
            </div>

            <q-card-section class="text" @click="openModalNote">
                {{ data?.content }}
            </q-card-section>
        </div>
        <div class="actions-btn">
            <q-card-actions align="right" v-if="isHovered">

                <q-btn flat round size="10px">
                    <q-icon name="o_color_lens" />
                </q-btn>
                <q-btn flat round size="10px">
                    <q-icon v-if="data.archived === 0" name="o_archive" @click="archiveNote" v-model="archive" />
                    <q-icon v-else name="o_unarchive" @click="unarchiveNote" v-model="archive" />
                </q-btn>

                <q-btn-dropdown flat size="10px" no-icon-animation rounded dropdown-icon="more_vert">
                    <q-item clickable v-close-popup @click="deleteNote">
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
        const data = notesStore();
        return data
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