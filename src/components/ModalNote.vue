<template>
  <q-dialog v-model="showDialogProp">
    <q-card ref="modal-style" class="modal-style">
      <q-card-section class="inputtitlexpin">


        <div class="text-h6 inputtitleModalContainer ">
          <q-input class=" text-h6 inputtitleModal" placeholder="Título" borderless v-model="title"/>
        </div>
        <div>
          <q-btn flat round class="pinModal-style">
            <q-tooltip v-if="pin === 0" anchor="bottom middle" self="center middle">
              Fijar la nota
            </q-tooltip>
            <q-tooltip v-else anchor="bottom middle" self="center middle">
              Dejar de fijar nota
            </q-tooltip>
            <q-icon v-if="pin === 0" name="o_push_pin" v-model="pin" @click="setPin" />
            <q-icon v-else name="push_pin" v-model="pin" @click="setPin" />
          </q-btn>
        </div>


      </q-card-section>

      <q-card-section class="inputcontentModalContainer">
        <q-input class="inputcontentModal" borderless placeholder="Nota" v-model="content" />

      </q-card-section>

      <div>
        <q-card-actions class="actionsModal">
          <q-btn round flat>
            <q-tooltip anchor="bottom middle" self="center middle">
              Opciones de fondo
            </q-tooltip>
            <q-icon name="o_color_lens" />
          </q-btn>
          <q-btn round flat>
            <q-tooltip anchor="bottom middle" self="center middle">
              Archivar
            </q-tooltip>
            <q-icon v-if="archive === 0" name="o_archive" @click="archiveNote" v-model="archive" />
            <q-icon v-else name="o_unarchive" @click="unarchiveNote" v-model="archive" />
          </q-btn>

          <q-btn-dropdown flat no-icon-animation rounded dropdown-icon="more_vert">
            <template v-slot:label>
              <q-tooltip anchor="bottom middle" self="center middle">
                Más
              </q-tooltip>
            </template>
            <q-item clickable v-close-popup @click="deleteNote">
              <q-item-section>
                <q-item-label>Borrar nota</q-item-label>
              </q-item-section>
            </q-item>
          </q-btn-dropdown>
          <q-btn flat label="Cerrar" @click="updateNote" v-close-popup />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>


<script>
import { deleteNote } from "src/boot/axiosActions";
import { notesStore } from "src/stores/dataStore";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "ModalNote",
  props: {
    data: {
      type: Object,
      required: true,
    },
    showDialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showDialogProp: false,
    };
  },
  setup(props) {
    const data = notesStore();
    const id = ref("");
    const title = ref("");
    const content = ref("");
    const pin = ref('');
    const archive = ref('')
    const prevTitle = ref('')
    const prevContent = ref('')

    onMounted(() => {
      prevTitle.value = props.data.title
      prevContent.value = props.data.content
      id.value = props.data.id;
      title.value = props.data.title
      content.value = props.data.content
      pin.value = props.data.pinned;
      archive.value = props.data.archived
    });
    return {
      id,
      title,
      content,
      pin,
      archive,
      data,
      prevTitle,
      prevContent
    };
  },
  watch: {
    showDialog(newValue) {
      this.showDialogProp = newValue;
      console.log("newValue");

      console.log(this.title);
      console.log(this.prevTitle);
      if(this.title !== this.prevTitle || this.content !== this.prevContent ){
        this.updateNote()
      }
      //
    },
    showDialogProp(newValue) {
      this.$emit("update:showDialog", newValue);
      console.log("showDialogProp");

    },
  },
  methods: {
    unarchiveNote() {
      this.showDialogProp = false
      this.archive = 0
      console.log('aquienmodal');
      this.updateNoteForUnarchive(this.id, this.title, this.content, this.pin, this.archive)
    },
    setPin() {
      this.pin = this.pin === 0 ? 1 : 0;
    },
    async archiveNote() {
      this.showDialogProp = false
      try {
        const response = await this.data.archiveNote(this.id)
        const dataStore = notesStore();
        dataStore.setData(response.data)
      } catch (error) {
        console.log(error);
      }
    },
    async updateNote() {
      console.log(this.archive);
      try {
        const response = await this.data.updateNote(this.id, this.title, this.content, this.pin, this.archive)
        const dataStore = notesStore();
        dataStore.setData(response.data)
        this.archive === 0 ? dataStore.setData(response.data) : dataStore.setArchivedNotes(response.data)
      } catch (error) {
        console.log(error);
      }
    },
    async deleteNote() {
      console.log(this.archive);
      this.showDialogProp = false
      try {
        const response = await deleteNote(this.id);
        const dataStore = notesStore();
        this.archive === 0 ? dataStore.setData(response.data) : dataStore.setArchivedNotes(response.data)
      } catch (error) {
        console.log(error);
      }
    },
    async updateNoteForUnarchive() {
      try {
        const response = await this.data.updateNote(this.id, this.title, this.content, this.pin, this.archive)
        const dataStore = notesStore();
        dataStore.setData(response.data)
        dataStore.setArchivedNotes(response.data)
      } catch (error) {
        console.log(error);
      }
    }
  },
});
</script>