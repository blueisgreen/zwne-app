<template>
  <q-page padding>
    <div v-if="!lesson">Loading...</div>
    <div v-else>
      <div class="text-h3">{{ lesson.title }}</div>
      <div class="text-subtitle2">{{ lesson.subtitle }}</div>
      <q-separator spaced="md" />
      <div v-html="lesson.content" />
    </div>
    <div>
      <q-btn
        :to="{ name: 'lessons' }"
        color="primary"
        label="Return to Lesson Catalog"
      />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useViewingStore } from 'stores/viewing'
import LessonFrame from './LessonFrame.vue'

const viewing = useViewingStore()
const route = useRoute()
const lessonId = route.params.id
const lesson = computed(() => {
  return viewing.lesson(lessonId)
})
onMounted(async () => {
  await viewing.loadLesson(lessonId)
})
</script>

<style lang="scss" scoped></style>
