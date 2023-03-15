<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Lesson Composer</div>
        <div class="text-caption text-secondary">
          Where you put together the content for enlightenment.
        </div>
      </q-toolbar-title>
      <q-btn
        :to="{ name: 'lessonPlanner', params: { id: lessonId } }"
        color="primary"
        no-caps
        >Go To Lesson Planner</q-btn
      >
    </q-toolbar>

    <q-banner class="bg-warning text-center" v-if="isDraftDirty">
      Save your changes.
    </q-banner>
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
        <div v-if="lessonPlan">
          <div class="text-h6 text-center">
            {{ lessonPlan.title }}
          </div>
          <div class="text-caption text-secondary text-center">
            {{ lessonPlan.subtitle }}
          </div>
          <tip-tap-editor v-model="draftContent" @save="onSave" />
        </div>
        <div v-if="!lessonPlan">
          Loading...If this message stays longer than a few seconds, something is wrong.
        </div>
      </q-tab-panel>
      <q-tab-panel name="preview">
        <lesson-preview />
      </q-tab-panel>
      <q-tab-panel name="html">
        <div class="text-h6">HTML</div>
        <q-card>
          <q-card-section>
            <pre style="white-space: pre-line">{{ draftContent }}</pre>
          </q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseBuilderStore } from 'src/stores/course-builder.js'
import { useLessonPlannerStore } from 'stores/lesson-planner.js'
import TipTapEditor from 'components/editor/TipTapEditor.vue'
import LessonPreview from './LessonPreview.vue'

const route = useRoute()
const builder = useCourseBuilderStore()

const tabModel = ref('edit')

const lessonId = route.params.id
const lessonPlan = builder.lessonPlan(lessonId)
const draftContent = lessonPlan.content

const isDraftDirty = computed(() => draftContent != lessonPlan.content)

function onSave() {
  builder.saveLessonContent(lessonId, draftContent)
}
</script>

<style lang="scss" scoped></style>
