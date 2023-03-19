<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Lesson Planner</div>
        <div class="text-caption text-secondary">
          Create, edit, and publish lessons for the good humankind.
        </div>
      </q-toolbar-title>
      <q-btn :to="{ name: 'courseLab' }" color="primary" no-caps>To Course Lab</q-btn>
    </q-toolbar>

    <div v-if="lessonToEdit">
      <lesson-plan-details :lesson="lessonToEdit" />
    </div>
  </q-page>
</template>

<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
} from 'vue'
import { useRoute } from 'vue-router'
import { useCourseBuilderStore } from 'stores/course-builder.js'
import LessonPlanDetails from './LessonPlanDetails.vue'

const route = useRoute()
const lessonId = route.params.id

const builder = useCourseBuilderStore()
const lessonToEdit = ref(null)

onBeforeMount(() => {
  console.log('onBeforeMount')
})
onMounted(async () => {
  console.log('onMounted')
  if (lessonId) {
    lessonToEdit.value = await builder.loadLesson(lessonId)
    console.log('Lesson loaded => ' + JSON.stringify(lessonToEdit.value))
  } else {
    console.error('Failed to load. Lesson ID unknown.')
  }
})
onBeforeUpdate(() => {
  console.log('onBeforeUpdate')
})
onUpdated(() => {
  console.log('onUpdated')
})
onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
})
onUnmounted(() => {
  console.log('onUnmounted')
})
onErrorCaptured(() => {
  console.log('onErrorCaptured')
})
</script>

<style lang="scss" scoped></style>
