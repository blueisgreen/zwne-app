<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Build a Lesson</div>
        <div class="text-caption text-secondary">
          {{ lessonId }}
        </div>
      </q-toolbar-title>
      <div class="q-gutter-sm">
        <q-btn
          v-if="isInfoMode"
          label="Content"
          icon="article"
          color="secondary"
          no-caps
          dense
          @click="toggleMode"
        />
        <q-btn
          v-if="isContentMode"
          label="Information"
          icon="info"
          color="secondary"
          no-caps
          dense
          @click="toggleMode"
        />
        <q-btn
          :to="{ name: 'lessonLab' }"
          color="primary"
          no-caps
          dense
          label="To Lab Lobby"
        />
      </div>
    </q-toolbar>
    <div v-if="lessonToBuild">
      <lesson-details-panel v-if="isInfoMode" :lesson="lessonToBuild" />
      <lesson-content-panel
        v-if="isContentMode"
        :lesson="lessonToBuild"
        :lesson-content="lessonContentToBuild"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLessonLabStore } from 'src/stores/lesson-lab'
import LessonDetailsPanel from './LessonDetailsPanel.vue'
import LessonContentPanel from './LessonContentPanel.vue'

const route = useRoute()
const lab = useLessonLabStore()
const lessonId = route.params.id
const mode = ref('info')

const isInfoMode = computed(() => {
  return mode.value === 'info'
})
const isContentMode = computed(() => {
  return mode.value === 'content'
})
const toggleMode = () => {
  if (mode.value === 'info') {
    mode.value = 'content'
  } else {
    mode.value = 'info'
  }
}
const lessonToBuild = computed(() => {
  return lab.lesson(lessonId) || {}
})
const lessonContentToBuild = computed(() => {
  return lab.lessonContent(lessonId) || ''
})

onMounted(async () => {
  await Promise.all([lab.loadLesson(lessonId), lab.loadLessonContent(lessonId)])
})
</script>

<style lang="scss" scoped></style>
