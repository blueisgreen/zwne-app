<template>
  <div v-if="!draftLesson">Loading...</div>
  <div v-else>
    <q-card bordered>
      <q-card-section>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Title</div>
          <div class="col">
            <q-input v-model="draftLesson.title" outlined dense />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Subtitle</div>
          <div class="col">
            <q-input v-model="draftLesson.subtitle" outlined dense />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Synopsis</div>
          <div class="col">
            <q-input v-model="draftLesson.synopsis" autogrow outlined dense />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Objective</div>
          <div class="col">
            <q-input v-model="draftLesson.objective" autogrow outlined dense />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Cover Art</div>
          <div class="col">
            <q-input v-model="draftLesson.cover" outlined dense />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn label="Save" color="primary" @click="save" />
        <q-btn
          label="Cancel"
          @click="cancel"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useLessonLabStore } from 'stores/lesson-lab.js'

const props = defineProps({
  lesson: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['save', 'cancel'])
const lab = useLessonLabStore()
const draftLesson = ref(null)

onMounted(() => {
  draftLesson.value = { ...props.lesson }
})

async function save() {
  console.log('draft lesson', draftLesson.value)
  if (!draftLesson.value) {
    console.warn('cannot save without a draft')
    return
  }
  emit('save', draftLesson.value)
}
function cancel() {
  emit('cancel')
}
</script>

<style lang="scss" scoped></style>
