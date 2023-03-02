<template>
  <div class="text-h6">Preview</div>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ planner.selectedLesson.title }}</div>
      <div class="text-caption text-secondary">
        {{ planner.selectedLesson.subtitle }}
      </div></q-card-section
    >
    <q-card-section>
      <span v-html="planner.activeContentDraft" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useLessonPlannerStore } from 'stores/lesson-planner-store.js'

const planner = useLessonPlannerStore()
</script>

<style lang="scss" scoped></style>
