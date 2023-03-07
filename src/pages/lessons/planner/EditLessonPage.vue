<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Lesson Composer</div>
        <div class="text-caption text-secondary">
          Where you put together the content for enlightenment.
        </div>
      </q-toolbar-title>
      <q-btn :to="{ name: 'lessonPlanner' }" color="primary" no-caps
        >Go To Lesson Planner</q-btn
      >
    </q-toolbar>

    <q-tabs
      v-model="tabModel"
      class="bg-blue-1 text-primary"
      dense
      inline-label
      no-caps
      indicator-color="secondary"
    >
      <q-tab name="edit" label="Edit" />
      <q-tab name="preview" label="Preview" />
      <q-tab name="html" label="HTML" />
    </q-tabs>

    <q-tab-panels v-model="tabModel">
      <q-tab-panel name="edit">
        <div v-if="planner.selectedLesson">
          <div class="text-h6 text-center">
            {{ planner.selectedLesson.title }}
          </div>
          <div class="text-caption text-secondary text-center">
            {{ planner.selectedLesson.subtitle }}
          </div>
        </div>
        <tip-tap-editor v-model="planner.activeContentDraft" @save="onSave" />
      </q-tab-panel>
      <q-tab-panel name="preview">
        <lesson-preview />
      </q-tab-panel>
      <q-tab-panel name="html">
        <div class="text-h6">HTML</div>
        <q-card>
          <q-card-section>
            <pre style="white-space: pre-line">{{ planner.activeContentDraft }}</pre>
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
import { useLessonPlannerStore } from 'stores/lesson-planner.js'
import TipTapEditor from 'components/editor/TipTapEditor.vue'
import LessonPreview from './LessonPreview.vue'

const $q = useQuasar()
const planner = useLessonPlannerStore()
const tabModel = ref('edit')

function onSave() {
  planner.saveContentChanges()
}

onBeforeMount(() => {
  const lessonId = useRoute().params.id
  planner.prepLessonForEdit(lessonId)
})

onMounted(() => {})
</script>

<style lang="scss" scoped></style>
