<template>
  <div>Lesson Builder</div>
  <q-input v-model="imageUrl" label="Image URL to insert" />
  <q-btn @click="imagePrompt = true" label="Add image" />
  <q-img v-for="image in images" :key="image" :src="image.src" />

  <q-dialog v-model="imagePrompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Image URL</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="imageUrl"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add address" @click="addImage()" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

const imageUrl = ref('https://')
const imagePrompt = ref(false)
const images = ref([])

function addImage() {
  console.log('Add image: ' + imageUrl.value)
  images.value.push({
    src: imageUrl.value,
  })
}
</script>

<style lang="scss" scoped></style>
