<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Build Lesson</div>
        <div class="text-caption text-secondary">
          {{ lessonId }}
        </div>
      </q-toolbar-title>
      <q-btn :to="{ name: 'lessonLab' }" color="primary" no-caps label="To Lab Lobby" />
    </q-toolbar>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLessonLabStore } from 'src/stores/lesson-lab'

const route = useRoute()
const lab = useLessonLabStore()
const lessonId = route.params.id

onMounted(async () => {
  await lab.loadLesson(lessonId)
})
</script>

<style lang="scss" scoped></style>
