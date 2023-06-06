
<template>
  <q-layout view="hHh LpR fFf">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar square>
            <img src="https://cdn-icons-png.flaticon.com/512/2965/2965358.png">
          </q-avatar>
          keep
        </q-toolbar-title>
        <q-input bg-color="gray" dark standout bottom-slots v-model="search" @input="handleSearch" placeholder="Buscar" >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:append>
          <q-icon v-if="search" name="close" @click="search = ''" class="cursor-pointer" round />
        </template>
      </q-input>
      </q-toolbar>
      
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left">
      <div>
        <router-link to="/">Notas</router-link><br>
        <router-link to="/archived">Archivadas</router-link><br>
        <router-link to="/trash">Papelera</router-link>
      </div>
    </q-drawer>

    <q-page-container>
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
  components: {NewNote},
  setup () {

    const leftDrawerOpen = ref(false)

    return {
      search: ref(''),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }

  },
}
</script>
