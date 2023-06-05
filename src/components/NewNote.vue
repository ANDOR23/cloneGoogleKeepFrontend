<template>
  <div>
    <q-input v-show="clicked" outlined placeholder="Crear una nota..." @click="showForm" />
    <div v-show="!clicked" class="no-border">
      <q-input borderless v-model="title" class="no-outline" placeholder="Título" /><q-icon name="o_push_pin" v-model="pin" @click="setPin" />
      <q-input borderless v-model="content" placeholder="Crear una nota..." />
      <div>
        <q-icon name="o_color_lens" />
        <q-icon name="o_archive" @click="setArchive" v-model="archive"/>
        <q-btn flat @click="setNote">Cerrar</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { setNote } from 'src/boot/axiosActions';
import { useRouter } from 'vue-router';

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
    return {
      clicked,
      showForm() {
        clicked.value = !clicked.value
        console.log('hola');
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
    async setNote() {
      this.clicked = true
      try {
        const response = await setNote(this.title, this.content, this.pin, this.archive)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      
    }
  }
}

</script>

<style></style>