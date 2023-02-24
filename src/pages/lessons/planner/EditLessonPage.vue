<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h6">{{ planner.selectedLesson.title }}</div>
        <div class="text-caption text-secondary">
          {{ planner.selectedLesson.subtitle }}
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
        label="Exit to Planner"
        content-class="text-secondary"
      />
    </q-tabs>

    <q-tab-panels v-model="tabModel">
      <q-tab-panel name="edit">
        <composition-editor
          :starting-text="content"
          bare-bones
          @save-work="handleSave"
        />
      </q-tab-panel>
      <q-tab-panel name="preview">
        <q-card>
          <q-card-section class="text-h6">Preview</q-card-section>
          <q-card-section> <span v-html="content" /> </q-card-section
        ></q-card>
      </q-tab-panel>
      <q-tab-panel name="html">
        <q-card>
          <q-card-section class="text-h6">HTML View</q-card-section>
          <q-card-section>{{ content }}</q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLessonPlannerStore } from 'stores/lesson-planner-store.js'
import CompositionEditor from 'components/CompositionEditor.vue'
import LessonEditorSpecs from './LessonEditorSpecs.vue'

const planner = useLessonPlannerStore()
const tabModel = ref('preview')
const content = ref('')

function handleSave(docOut) {
  content.value = docOut
  planner.saveContentChanges(content.value)
}

onMounted(() => {
  const lessonId = useRoute().params.id
  planner.fetchLessonContent(lessonId)
  content.value = planner.selectedLesson.content
})
</script>

<style lang="scss" scoped></style>
