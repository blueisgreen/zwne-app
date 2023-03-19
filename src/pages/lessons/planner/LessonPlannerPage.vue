<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h2 text-primary">Lesson Planner</div>
        <div class="text-caption text-secondary q-pl-xs">
          Create, edit, and publish lessons for the good humankind.
        </div>
      </q-toolbar-title>
      <q-btn :to="{ name: 'courseLab' }" color="primary" no-caps>To Course Lab</q-btn>
    </q-toolbar>

    <div v-if="lessonToEdit">
      <lesson-plan-details :lesson="lessonToEdit" />
    </div>
    <div v-else class="q-pa-md">
      <div class="text-h4">Loading...</div>
      <div class="q-my-md text-body1">
        If you see this for more than a few seconds, perhaps we cananot find the lesson
        you are looking for. Click the button to return to the Course Lab entrance and
        pick something that is available.
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseBuilderStore } from 'stores/course-builder.js'
import LessonPlanDetails from './LessonPlanDetails.vue'

const route = useRoute()
const lessonId = route.params.id

const builder = useCourseBuilderStore()
const lessonToEdit = computed(() => {
  return builder.lessonPlan(lessonId)
})

onMounted(async () => {
  console.log('onMounted')
  if (lessonId) {
    // TODO: add loading indicator
    await builder.loadLesson(lessonId)
  } else {
    console.error('Failed to load. Lesson ID unknown.')
  }
})
</script>

<style lang="scss" scoped></style>
