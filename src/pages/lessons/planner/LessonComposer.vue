<template>
  <div>
    <q-btn
      label="Save"
      :disable="!lesson.isDraftDirty"
      @click="lesson.saveContentChanges"
    />
    <q-editor v-model="lesson.activeContentDraft" />
  </div>
</template>

<script setup>
import { useLessonPlannerStore } from 'stores/lesson-planner-store.js'

const lesson = useLessonPlannerStore()
</script>

<style lang="scss" scoped></style>
