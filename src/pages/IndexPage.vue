<template>
  <q-page class="flex column">
    <NewNote/>
    <div class="flex wrap´row justify-evenly q-pa-md q-border-dark">
      <NoteCard v-for="item in data" :key="item.id" :data="item" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import NoteCard from 'src/components/NoteCard.vue';
import { getAllNotes } from 'src/boot/axiosActions';
import NewNote from 'src/components/NewNote.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { NoteCard, NewNote },
  setup() {
    let data = ref([]);
    onMounted( () => {
       getAllNotes().then((response) => {
        data.value = response.value
      })
    })
    return {
      data
    }
  }
})
</script>
