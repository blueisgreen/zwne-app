<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Build a Lesson</div>
        <div class="text-caption text-secondary">
          {{ lessonId }}
        </div>
      </q-toolbar-title>
      <q-btn :to="{ name: 'lessonLab' }" color="primary" no-caps label="To Lab Lobby" />
    </q-toolbar>
    <lesson-details-panel v-if="lessonToBuild" :lesson="lessonToBuild" />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLessonLabStore } from 'src/stores/lesson-lab'
import LessonDetailsPanel from './LessonDetailsPanel.vue'

const route = useRoute()
const lab = useLessonLabStore()
const lessonId = route.params.id
const lessonToBuild = computed(() => {
  return lab.lesson(lessonId)
})

onMounted(async () => {
  await lab.loadLesson(lessonId)
})
</script>

<style lang="scss" scoped></style>
