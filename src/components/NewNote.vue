<template>
  <div>
    <q-input v-show="clicked" outlined placeholder="Crear una nota..." @click="showForm" />
    <div v-show="!clicked" class="no-border">
      <q-input borderless v-model="title" class="no-outline" placeholder="Título" />
      <q-btn flat round><q-icon name="o_push_pin" v-model="pin" @click="setPin" /></q-btn>
      <q-input borderless v-model="content" placeholder="Crear una nota..." />
      <div>
        <q-btn flat round><q-icon name="o_color_lens" /></q-btn>
        <q-btn flat round><q-icon name="o_archive" @click="setArchive" v-model="archive"/></q-btn>
        <q-btn flat @click="setNote">Cerrar</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { setNote } from 'src/boot/axiosActions';
import { notesStore } from 'src/stores/dataStore';

export default {

  name: 'NewNote',
  data() {
    return {
      pin: 0,
      title: '',
      content: '',
      archive: 0
    }
  },
  setup() {
    const clicked = ref(true)
    const data = notesStore()
    return {
      data,
      clicked,
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
    setArchive() {
      this.archive = this.archive === 0 ? 1 : 0
      console.log(this.archive);
    },
    async setNote(){
      this.showForm();
      try {
        const response = await this.data.setNewNote(this.title, this.content, this.pin, this.archive)
        const dataStore= notesStore(); 
        dataStore.setData(response.data)
      } catch (error) {
        console.log(error);
      }
    }
  }
}

</script>

<style></style>