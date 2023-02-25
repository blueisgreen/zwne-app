<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Lesson Composer</div>
        <div class="text-caption text-secondary">
          Where you put together the content for enlightenment.
        </div>
      </q-toolbar-title>
      <lesson-editor-specs />
    </q-toolbar>

    <q-tabs v-model="tabModel" no-caps dense class="bg-grey-2 text-primary">
      <q-tab name="preview" label="Preview" />
      <q-tab name="edit" label="Edit" />
      <q-tab name="html" label="HTML View" />
      <q-route-tab
        :to="{ name: 'lesson-planner' }"
        label="Back to Planner"
        content-class="text-secondary"
        icon="fa-solid fa-left-long"
      />
    </q-tabs>

    <q-tab-panels v-model="tabModel">
      <q-tab-panel name="edit">
        <lesson-composer />
      </q-tab-panel>
      <q-tab-panel name="preview">
        <div class="text-h6">Preview</div>
        <q-card>
          <q-card-section class="text-h6">
            <div class="text-h6">{{ planner.selectedLesson.title }}</div>
            <div class="text-caption text-secondary">
              {{ planner.selectedLesson.subtitle }}
            </div></q-card-section
          >
          <q-card-section>
            <span v-html="planner.activeContentDraft" /> </q-card-section
        ></q-card>
      </q-tab-panel>
      <q-tab-panel name="html">
        <div class="text-h6">HTML View</div>
        <q-card>
          <q-card-section>{{ planner.activeContentDraft }}</q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLessonPlannerStore } from 'stores/lesson-planner-store.js'
import LessonComposer from './LessonComposer.vue'
import LessonEditorSpecs from './LessonEditorSpecs.vue'

const planner = useLessonPlannerStore()
const tabModel = ref('preview')

function handleSave() {
  planner.saveContentChanges()
}

onMounted(() => {
  const lessonId = useRoute().params.id
  planner.fetchLessonContent(lessonId)
  planner.selectLesson(lessonId)
  planner.editSelectedLessonContent()
})
</script>

<style lang="scss" scoped></style>
