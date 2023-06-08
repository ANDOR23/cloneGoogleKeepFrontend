<template >
  <div class="input-container">
    <q-input  v-show="!clicked" outlined placeholder="Crear una nota..." @click="showForm" />
    <div v-show="clicked"  class="inputForm-style">
      <div class="inputTitleContainer">
        <q-input borderless v-model="title" class="inputNewTitle" placeholder="Título" />
      <q-btn flat round >
        <q-tooltip anchor="bottom middle" self="center middle">
              Fijar la nota
            </q-tooltip>
        <q-icon name="o_push_pin" v-model="pin" @click="setPin" />
      </q-btn>
      </div>
      
      <q-input borderless v-model="content" placeholder="Crear una nota..." />
      <div class="actionsNewNote">
        <q-btn flat round>
          <q-tooltip anchor="bottom middle" self="center middle">
              Opciones de fondo
            </q-tooltip>
            <q-icon name="o_color_lens" /></q-btn>
        <q-btn flat round>
          <q-tooltip anchor="bottom middle" self="center middle">
              Archivar
            </q-tooltip>
            <q-icon name="o_archive" @click="archiveNote" v-model="archive" />
          </q-btn>
        <q-btn flat @click="setNote">Cerrar</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { setNote } from 'src/boot/axiosActions';
import { notesStore } from 'src/stores/dataStore';

export default {

  name: 'NewNote',
  data() {
    return {
      pin: 0,
      title: '',
      content: '',
      archive: 0,
      id:0
    }
  },
  setup() {
    const clicked = ref(false)
    const data = notesStore()
    return {
      data,
      clicked,
      closeForm(){
        clicked.value = false
      },
      showForm() {
        clicked.value = !clicked.value
      }
    }
  },
  methods: {
    setPin() {
      this.pin = this.pin === 0 ? 1 : 0
      console.log(this.pin);
    },
    async archiveNote() {
      if (this.title === '' && this.content === '') {
        this.showForm();
      }else{
      this.showForm();
      try {
        const idResponse = await this.setNote(this.title, this.content, this.pin, this.archive)
        this.id = idResponse.id
        console.log('jiji', this.id);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await this.data.archiveNote(this.id)
        const dataStore = notesStore();
        dataStore.setData(response.data)
      } catch (error) {
        console.log(error);
      }}
    },
    async setNote() {
      if (this.title === '' && this.content === '') {
        this.showForm();
      } else {
        this.showForm();
        try {
          const response = await this.data.setNewNote(this.title, this.content, this.pin, this.archive)
          const dataStore = notesStore();
          dataStore.setData(response.data)
          return response
        } catch (error) {
          console.log(error);
        }
        this.title = ''
        this.content = ''
        
      }

    }
  },
  computed: {
    headerClasses() {
      return {
        'dark-mode': this.$q.dark.isActive,
        'light-mode': !this.$q.dark.isActive
      };
    }

  }
}

</script>

<!-- <style>.hidden {
  visibility: hidden;
}</style> -->