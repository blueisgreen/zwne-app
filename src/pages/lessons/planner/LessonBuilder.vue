<template>
  <tip-tap-editor v-model="planner.activeContentDraft" @save="handleSave" />
</template>

<script setup>
import { useLessonPlannerStore } from 'stores/lesson-planner-store.js'
import TipTapEditor from 'components/TipTapEditor.vue'

const planner = useLessonPlannerStore()
function handleSave() {
  planner.saveContentChanges()
}
</script>

<style lang="scss" scoped></style>
