<template>
  <q-page padding>
    <div class="text-h1 q-pt-lg q-pb-md text-primary">Learning Center</div>
    <div class="text-subtitle1 q-pb-lg text-blue-10">
      Where you can find everything you want to know in bite-sized chunks.
    </div>

    <lesson-catalog :item-limit="6" />

    <q-list>
      <q-item
        v-for="lesson in viewing.published"
        :key="lesson.id"
        clickable
        :to="{ name: 'lessonViewer', params: { id: lesson.id } }"
      >
        {{ lesson.title }}
      </q-item>
    </q-list>
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
