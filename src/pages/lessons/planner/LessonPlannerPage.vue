<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Lesson Planner</div>
        <div class="text-caption text-secondary">
          Create, edit, and publish lessons for the good humankind.
        </div>
      </q-toolbar-title>
      <q-btn :to="{ name: 'courseLab' }" color="primary" no-caps
        >To Course Lab</q-btn
      >
    </q-toolbar>

    <lesson-plan-details :lesson-id="lessonId" />
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'
import LessonPlanDetails from './LessonPlanDetails.vue'

const route = useRoute()
const lessonId = route.params.id
</script>

<style lang="scss" scoped></style>
