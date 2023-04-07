<template>
  <q-toolbar>
    <q-toolbar-title>Lesson Content</q-toolbar-title>
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
    <q-tab name="preview" label="Preview" />
    <q-tab name="edit" label="Edit" />
    <q-tab name="html" label="HTML" />
  </q-tabs>

  <q-tab-panels v-model="tabModel">
    <q-tab-panel name="edit">
      <div class="q-mb-md text-subtitle1">
        Editing:
        <span class="text-italic">{{ lesson.title }}</span>
      </div>
      <tip-tap-editor v-model="draftContent" @save="onSave" />
    </q-tab-panel>
    <q-tab-panel name="preview">
      <div class="q-pa-md shadow-3">
        <div class="text-subtitle1">{{ lesson.title }}</div>
        <div class="text-caption">
          {{ lesson.subtitle }}
        </div>
        <q-separator spaced />
        <span class="preview-style" v-html="draftContent" />
      </div>
    </q-tab-panel>
    <q-tab-panel name="html">
      <div class="q-pa-md shadow-3">
        <pre style="white-space: pre-line">{{ draftContent }}</pre>
      </div>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLessonLabStore } from 'stores/lesson-lab.js'
import TipTapEditor from 'components/editor/TipTapEditor.vue'

const props = defineProps({
  lesson: {
    type: Object,
    required: true,
  },
  lessonContent: {
    type: String,
    required: true,
  },
})

const lab = useLessonLabStore()
const tabModel = ref('preview')

const draftContent = ref('')
const isDraftDirty = computed(() => draftContent.value != props.lessonContent)

onMounted(() => {
  draftContent.value = props.lessonContent
})

function onSave() {
  lab.saveContent(props.lesson.id, draftContent.value)
}
</script>

<style lang="scss" scoped>
.preview-style {
  padding: 0.5em;
  img {
    width: 50%;
  }
}
</style>
