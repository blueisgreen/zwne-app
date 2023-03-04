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

    <q-tabs v-model="tabModel" class="bg-blue-1 text-primary" dense no-caps>
      <q-tab name="edit" label="Edit" />
      <q-tab name="preview" label="Preview" />
      <q-tab name="html" label="HTML" />
      <q-route-tab
        :to="{ name: 'lesson-planner' }"
        label="Back to Planner"
        content-class="text-secondary"
        icon="fa-solid fa-left-long"
      />
    </q-tabs>

    <q-tab-panels v-model="tabModel">
      <q-tab-panel name="edit">
        <lesson-builder />
      </q-tab-panel>
      <q-tab-panel name="preview">
        <lesson-preview />
      </q-tab-panel>
      <q-tab-panel name="html">
        <div class="text-h6">HTML</div>
        <q-card>
          <q-card-section>
            <pre style="white-space: pre-line">{{
              planner.activeContentDraft
            }}</pre>
          </q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useLessonPlannerStore } from 'stores/lesson-planner-store.js'
import LessonBuilder from './LessonBuilder.vue'
import LessonPreview from './LessonPreview.vue'
import LessonEditorSpecs from './LessonEditorSpecs.vue'

const $q = useQuasar()
const planner = useLessonPlannerStore()
const tabModel = ref('edit')

onBeforeMount(() => {
  const lessonId = useRoute().params.id
  planner.prepLessonForEdit(lessonId)
})

onMounted(() => {})
</script>

<style lang="scss" scoped></style>
