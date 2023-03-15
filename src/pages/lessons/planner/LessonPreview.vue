<template>
  <div class="q-pa-md shadow-3">
    <div class="text-h5">{{ lessonPlan.title }}</div>
    <div class="text-caption text-secondary">
      {{ lessonPlan.subtitle }}
    </div>
    <span class="preview-style" v-html="draftContent" />
  </div>
</template>

<script setup>
const props = defineProps({
  lessonPlan: {
    type: Object,
    required: true,
  },
  draftContent: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
