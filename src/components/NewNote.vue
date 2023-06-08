<template >
  <div class="input-container">
    <q-input v-show="!clicked" outlined placeholder="Crear una nota..." @click="showForm" />
    <div v-show="clicked" :class="`inputForm-style ${color}`">
      <div class="inputTitleContainer">
        <q-input borderless v-model="title" class="inputNewTitle" placeholder="Título" />
        <q-btn flat round class="pin-btn">
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

      <q-input borderless v-model="content" placeholder="Crear una nota..." />
      <div class="actionsNewNote">
        <q-btn flat round size="10px" @click="toggleDropdownColor">
          <q-tooltip anchor="bottom middle" self="center middle">
            Opciones de color
          </q-tooltip>
          <q-icon name="o_color_lens" />
        </q-btn>

        <q-card v-if="showDropdownColors" class="newNotedropdownColors-Container">
          <div class="Colors-Container">
            <q-btn :class="headerClasses" class="color-btn" round size="10px" icon="o_format_color_reset"
              @click="changeColor('none')" />
            <q-btn round size="10px" style="background-color: #b0c2f2;" @click="changeColor('lila')" />
            <q-btn round size="10px" style="background-color: #fdcae1;" @click="changeColor('lightPink')" />
            <q-btn round size="10px" style="background-color: #b8e4ff;" @click="changeColor('bluesky')" />
            <q-btn round size="10px" style="background-color: #eaffc2;" @click="changeColor('lime')" />
            <q-btn round size="10px" style="background-color: #e79eff;" @click="changeColor('lightViolet')" />
          </div>

        </q-card>
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
import { ref } from 'vue';
import { notesStore } from 'src/stores/dataStore';

export default {

  name: 'NewNote',
  data() {
    return {
      pin: 0,
      title: '',
      content: '',
      archive: 0,
      id: 0,
      showDropdownColors: false,
      color: 'none',
      delete: 0
    }
  },
  setup() {
    const clicked = ref(false)
    const data = notesStore()
    return {
      data,
      clicked,
      closeForm() {
        clicked.value = false
      },
      showForm() {
        clicked.value = !clicked.value
      }
    }
  },
  methods: {
    changeColor(color) {
      this.color = color;
    },
    toggleDropdownColor() {
      this.showDropdownColors = !this.showDropdownColors
    },
    setPin() {
      this.pin = this.pin === 0 ? 1 : 0
      this.archive = this.pin === 1 ? 0 : 0
    },
    async archiveNote() {
      if (this.title === '' && this.content === '') {
        this.showForm();
      } else {
        console.log(this.title, this.content);

        try {
          const idResponse = await this.setNote(this.title, this.content, this.pin, this.archive, this.color)
          this.id = idResponse.id
          this.showForm();
          console.log('jiji', this.id);
        } catch (error) {
          console.log(error);
        }
        try {
          const response = await this.data.archiveNote(this.id)
          const dataStore = notesStore();
          this.showForm();
          dataStore.setData(response.data)
          this.title = ''
          this.content = ''
        } catch (error) {
          console.log(error);
        }

      }
    },
    async setNote() {
      if (this.title === '' && this.content === '') {
        this.changeColor('none')
        this.showForm();
      } else {
        this.showForm();
        try {
          const response = await this.data.setNewNote(this.title, this.content, this.pin, this.archive, this.color)
          const dataStore = notesStore();
          dataStore.setData(response.data)
          this.title = ''
          this.content = ''
          this.changeColor('none')
          return response
        } catch (error) {
          console.log(error);
        }
      }

    }
  },
}

</script>
