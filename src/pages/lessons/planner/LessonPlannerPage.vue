<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Lesson Planner</div>
        <div class="text-caption text-secondary">
          Create, edit, and publish lessons for the good humankind.
        </div>
      </q-toolbar-title>
      <q-btn :to="{ name: 'courseBuilder' }" color="primary"
        >Build Course</q-btn
      >
      <q-btn @click="resetPage" label="reset" color="warning" />
      <lesson-planner-specs />
    </q-toolbar>

    <div class="q-pa-md row q-gutter-md">
      <div class="col-4">
        <lesson-plan-selector-list />
      </div>
      <div class="col">
        <lesson-plan-details v-if="planner.selectedLesson" />
        <q-chip v-else>
          <q-avatar size="lg">
            <img :src="Zanzibar" />
          </q-avatar>
          Choose a lesson
        </q-chip>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import LessonPlannerSpecs from './LessonPlannerSpecs.vue'
import LessonPlanSelectorList from './LessonPlanSelectorList.vue'
import LessonPlanDetails from './LessonPlanDetails.vue'
import { useLessonPlannerStore } from 'src/stores/lesson-planner.js'
import Zanzibar from 'assets/Zanzibar.svg'

const planner = useLessonPlannerStore()

async function resetPage() {
  planner.$reset()
  await planner.fetchLessonPlans()
}

onMounted(async () => {
  await planner.fetchLessonPlans()
})
</script>

<style lang="scss" scoped></style>
