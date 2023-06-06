<template>
  <q-dialog v-model="showDialogProp">
    <q-card>

      <q-btn flat round>

        <q-icon v-if="pin === 0" name="o_push_pin" v-model="pin" @click="setPin" />
        <q-icon v-else name="push_pin" v-model="pin" @click="setPin" />


      </q-btn>
      <q-card-section>
        <div class="text-h6">
          <q-input class="text-h6" placeholder="Título" borderless v-model="title" />
        </div>
        {{ data.pinned }}
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input borderless placeholder="Nota" v-model="content" />
        {{ data.archived }}
      </q-card-section>

      <div>
        <q-card-actions>
          <q-btn flat>
            <q-icon name="o_color_lens" />
          </q-btn>
          <q-btn flat>
            <q-icon v-if="archive === 0" name="o_archive" @click="setArchive" v-model="archive" />
            <q-icon v-else name="o_unarchive" @click="setArchive" v-model="archive" />
          </q-btn>

          <q-btn-dropdown flat no-icon-animation rounded dropdown-icon="more_vert">
            <q-item clickable v-close-popup @click="deleteNote">
              <q-item-section>
                <q-item-label>Borrar nota</q-item-label>
              </q-item-section>
            </q-item>
          </q-btn-dropdown>
        </q-card-actions>
        <q-card-actions>
          <q-btn flat label="Cerrar" @click="updateNote" v-close-popup />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>


<script>
import { updateNote, deleteNote } from "src/boot/axiosActions";
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

    onMounted(() => {
      id.value = props.data.id;
      title.value = props.data.title //=== null ? 'Título' : props.data.title;
      content.value = props.data.content // === null ? 'Nota' : props.data.content;
      pin.value = props.data.pinned;
      archive.value = props.data.archived
    });
    return {
      id,
      title,
      content,
      pin,
      archive,
      data
    };
  },
  watch: {
    showDialog(newValue) {
      this.showDialogProp = newValue;
      console.log("showDialog");
      
    },
    showDialogProp(newValue) {
      this.$emit("update:showDialog", newValue);
      console.log("showDialogProp");
      
    },
  },
  methods: {
    setPin() {
      this.pin = this.pin === 0 ? 1 : 0;
      console.log(this.pin);
      updateNote(this.id, this.title, this.content, this.pin, this.archive)
    },
    setArchive() {
      this.showDialogProp = false
      this.archive = this.archive === 0 ? 1 : 0;
      this.updateNote(this.id, this.title, this.content, this.pin, this.archive)
    },
    async updateNote() {
      try {
        const response = await this.data.updateNote(this.id, this.title, this.content, this.pin, this.archive)
        const dataStore = notesStore();
        this.archive === 1 ? dataStore.setData(response.data) : dataStore.setArchivedNotes(response.data)
        //console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteNote() {
      this.showDialogProp = false
      try {
        const response = await deleteNote(this.id);
        const dataStore = notesStore();
        this.archive === 0 ? dataStore.setData(response.data) : dataStore.setArchivedNotes(response.data)
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>