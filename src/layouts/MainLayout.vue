
<template>
  <q-layout view="hHh LpR fFf">
    
    <q-header bordered :class="headerClasses" >
      <div class="header-style">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="miniState = !miniState" />
          <div class="title-style">
            <q-toolbar-title >
            <q-avatar square>
              <img src="https://cdn-icons-png.flaticon.com/512/2965/2965358.png">
            </q-avatar>
            Keep
          </q-toolbar-title>
          </div>
          
      
      <q-input standout bottom-slots v-model="search" placeholder="Buscar" class="input-search">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:append>
          <q-icon class="inputcloseSearch-style" v-if="search" standout name="close" @click="search = ''"  />
        </template>
      </q-input>
      <q-toggle v-model="darkMode" color="blue-9" label="Modo oscuro" />
      </q-toolbar>
 </div>
    </q-header>
 
    <q-drawer show-if-above :width="300" v-model="drawer" side="left" :mini="miniState" @mouseout="miniState = true"
      @mouseover="miniState = false" class="drawer-style">
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <router-link to="/">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon :class="headerClasses" name="o_lightbulb" />
              </q-item-section>

              <q-item-section :class="headerClasses" class="text-weight-medium">
                Notas
              </q-item-section>
            </q-item>
          </router-link>
          <router-link to="/archived">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon :class="headerClasses" name="o_archive" />
              </q-item-section>

              <q-item-section :class="headerClasses" class="text-weight-medium">
                Archivar
              </q-item-section>
            </q-item>
          </router-link>
          <router-link to="/trash">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon :class="headerClasses" name="o_delete" />
              </q-item-section>

              <q-item-section :class="headerClasses" class="text-weight-medium">
                Papelera
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
import { ref, computed } from 'vue'
import NewNote from 'src/components/NewNote.vue'
import { titleHeaderStore } from 'src/stores/titleStore'
import { notesStore } from 'src/stores/dataStore'
/* import { useStore } from 'pinia'; */



export default {
  name: 'MainLayout',
  components: { NewNote },
  setup() {
    const data = notesStore();


    return {
      data,
      drawer: ref(false),
      miniState: ref(true),

    }
  },
  data() {
    return {
      search: '',
      darkMode: false
    }
  },
  watch: {
    search(newValue) {
      this.setQuery(newValue)
    },
    darkMode(newValue) {
      this.$q.dark.set(newValue);
    }
  },
  methods: {
    setQuery(newValue) {
      this.data.setSearchQuery(newValue)
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

