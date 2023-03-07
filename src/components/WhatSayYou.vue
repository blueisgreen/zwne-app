<template>
  <div class="q-pa-md" style="width: 100%; max-width: 500px">
    <SimpleEditor @post="handlePost" />
    <q-card flat bordered v-for="entry in whatsayyou.messages" :key="entry.id">
      <q-card-section>
        <div>{{ entry.who }} said:</div>
      </q-card-section>
      <q-card-section>
        <div v-html="entry.content" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import SimpleEditor from './editor/SimpleEditor.vue'
import { useWhatSayYouStore } from 'stores/whatsayyou-store.js'
const whatsayyou = useWhatSayYouStore()
const handlePost = (msg) => {
  whatsayyou.addMessage(msg)
}
</script>

<style lang="scss" scoped></style>
