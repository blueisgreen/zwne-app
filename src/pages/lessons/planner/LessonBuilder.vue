<template>
  <tip-tap-editor v-model="planner.activeContentDraft" />
</template>

<script setup>
import { ref } from 'vue'
import { useLessonPlannerStore } from 'stores/lesson-planner-store.js'
import TipTapEditor from 'components/TipTapEditor.vue'

const planner = useLessonPlannerStore()
</script>

<style lang="scss" scoped></style>
