<template>
  <q-toolbar>
    <q-toolbar-title>Lesson Information</q-toolbar-title>
    <span v-if="!editMode">
      <q-btn
        @click="editDraft"
        label="Edit"
        dense
        no-caps
        icon="edit"
        color="secondary"
      />
    </span>
  </q-toolbar>
  <div v-if="lesson">
    <lesson-details-view-card v-if="!editMode" :lesson="lesson" />
    <lesson-details-edit-card
      v-else
      :lesson="lesson"
      @save="saveDraft"
      @cancel="cancelEdit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLessonLabStore } from 'stores/lesson-lab.js'
import LessonDetailsViewCard from './LessonDetailsViewCard.vue'
import LessonDetailsEditCard from './LessonDetailsEditCard.vue'

const props = defineProps({
  lesson: {
    type: Object,
    required: true,
  },
})

const lab = useLessonLabStore()
const editMode = ref(false)
const draftLesson = ref(null)

function editDraft() {
  draftLesson.value = { ...props.lesson }
  editMode.value = true
}
async function saveDraft(draft) {
  console.log('draft lesson', draft)
  if (!draft) {
    console.warn('cannot save without a draft')
    return
  }
  await lab.saveLesson(draft)
  editMode.value = false
}
function cancelEdit() {
  editMode.value = false
}
</script>

<style lang="scss" scoped></style>
