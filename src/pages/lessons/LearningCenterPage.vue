<template>
  <q-page padding>
    <div class="text-h1 q-pt-lg q-pb-md text-primary">Learning Center</div>
    <div class="text-subtitle1 q-pb-lg text-blue-10">
      Where everything you want to know is served in bite-sized chunks.
    </div>

    <lesson-catalog :lessons="viewing.published" />
  </q-page>
</template>

<script setup>
import { useViewingStore } from 'stores/viewing'
import { onMounted } from 'vue'
import LessonCatalog from './LessonCatalog.vue'

const viewing = useViewingStore()

onMounted(async () => {
  await viewing.loadPublished()
})
</script>
