<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Lesson {{ lessonId }}</div>
        <div class="text-caption text-secondary">
          Share lessons for the good humankind.
        </div>
      </q-toolbar-title>
      <q-btn :to="{ name: 'lessonLab' }" color="primary" no-caps label="To Lab Lobby" />
    </q-toolbar>
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useLessonLabStore } from 'src/stores/lesson-lab'

const route = useRoute()
const lab = useLessonLabStore()

const lessonId = route.params.id
</script>

<style lang="scss" scoped></style>
