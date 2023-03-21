<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Lesson Planner</div>
        <div class="text-caption text-secondary">
          Create, edit, and publish lessons for the good humankind.
        </div>
      </q-toolbar-title>
      <q-btn
        :to="{ name: 'lessonPlanner', params: { id: lessonId } }"
        color="primary"
        no-caps
        >Go To Lesson Information</q-btn
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
          <div class="q-mb-md text-h5">
            Editing Lesson:
            <span class="text-italic">{{ lessonPlan.title }}</span>
          </div>
          <tip-tap-editor v-model="draftContent" @save="onSave" />
        </div>
        <div v-if="!lessonPlan">
          Loading...If this message stays longer than a few seconds, something is wrong.
        </div>
      </q-tab-panel>
      <q-tab-panel name="preview">
        <div class="q-mb-md text-h5">Lesson Preview</div>
        <div class="q-pa-md shadow-3">
          <div class="text-h5">{{ lessonPlan.title }}</div>
          <div class="text-caption text-secondary">
            {{ lessonPlan.subtitle }}
          </div>
          <span class="preview-style" v-html="draftContent" />
        </div>
      </q-tab-panel>
      <q-tab-panel name="html">
        <div class="q-mb-md text-h5">HTML View</div>
        <div class="q-pa-md shadow-3">
          <pre style="white-space: pre-line">{{ draftContent }}</pre>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseLabStore } from 'src/stores/course-lab.js'
import TipTapEditor from 'components/editor/TipTapEditor.vue'

const route = useRoute()
const builder = useCourseLabStore()

const tabModel = ref('edit')

const lessonId = route.params.id
const lessonPlan = builder.lessonPlan(lessonId)
const draftContent = ref(lessonPlan.content)

const isDraftDirty = computed(() => draftContent.value != lessonPlan.content)

function onSave() {
  builder.updateLesson({ id: lessonId, content: draftContent.value })
}
</script>

<style lang="scss" scoped>
.preview-style {
  padding: 3em;
}
</style>
