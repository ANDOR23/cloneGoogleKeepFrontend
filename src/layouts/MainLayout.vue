
<template>
  <q-layout view="hHh LpR fFf"><!-- FORMATO DEL LAYOUT -->
    <q-header bordered :class="headerClasses">
      <div>
        <!-- TOOLBAR O HEADER DE LA APLICACIÓN QUE CONTIENE COMPONENTES COMO 
            TOGGLE, AVATAR, Y EL TITULO QUE SE OBTIENE MEDIANTE EL TITLESTORE  -->
        <q-toolbar class="header-style">
          <div class="title-style">
            <q-btn dense flat round icon="menu" @click="miniState = !miniState" />

            <q-toolbar-title>
              <q-avatar square>
                <img src="https://cdn-icons-png.flaticon.com/512/2965/2965358.png">
              </q-avatar>
              {{ title.getTitle }}
            </q-toolbar-title>
          </div>
          <!-- BARRA DE BUSCADOR PARA ENCONTRAR NOTAS QUE COINCIDAN CON LO QUE SE INGRESÓ
              EN EL INPUT -->
          <q-input standout bottom-slots v-model="search" placeholder="Buscar" class="input-search">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon class="inputcloseSearch-style" v-if="search" standout name="close" @click="search = ''" />
            </template>
          </q-input>
          <!-- TOGGLE QUE INDICA SI LA APLICACIÓN ESTA EN DARK O LIGHT MODE -->
          <q-toggle v-model="darkMode" color="blue-9" label="Modo oscuro" />
        </q-toolbar>
      </div>
    </q-header>
    <!-- DRAWER O BARRA LATERAL, CONTIENE LAS OPCIONES DE NAVEGACIÓN DE LA APLICACIÓN -->
    <q-drawer show-if-above :width="300" v-model="drawer" side="left" :mini="miniState" @mouseout="miniState = true"
      @mouseover="miniState = false" class="drawer-style">
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <router-link to="/">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon :class="headerClasses" name="o_lightbulb" />
              </q-item-section>

              <q-item-section :class="headerClasses" class="text-weight-medium" @click="setTitle('Keep')">
                Notas
              </q-item-section>
            </q-item>
          </router-link>
          <router-link to="/archived">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon :class="headerClasses" name="o_archive" />
              </q-item-section>

              <q-item-section :class="headerClasses" class="text-weight-medium" @click="setTitle('Archivar')">
                Archivar
              </q-item-section>
            </q-item>
          </router-link>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="container">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import NewNote from 'src/components/NewNote.vue'
import { titleHeaderStore } from 'src/stores/titleStore'
import { notesStore } from 'src/stores/dataStore'

export default {
  name: 'MainLayout',
  components: { NewNote },
  /* CONFIGURACIÓN DE VARIABLES REACTIVAS */
  setup() {
    const data = notesStore();
    const title = titleHeaderStore();
    return {
      title,
      data,
      drawer: ref(false),
      miniState: ref(true),
    }
  },
  /* SE CONFIGURA LA DATA */
  data() {
    return {
      search: '',
      darkMode: false
    }
  },
  /* SE OBSERVAN LOS CAMBIOS QUE LLEGUEN A TENER LOS DATOS */
  watch: {
    search(newValue) {
      this.setQuery(newValue)
    },
    darkMode(newValue) {
      this.$q.dark.set(newValue);
    },
  },
  /* FUNCIONES QUE ENVÍAN DATA A AMBOS STORES */
  methods: {
    setQuery(newValue) {
      this.data.setSearchQuery(newValue)
    },
    setTitle(title){
      this.title.setTitle(title)
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

