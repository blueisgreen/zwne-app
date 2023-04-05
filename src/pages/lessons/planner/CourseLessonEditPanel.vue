<template>
  <div class="row" v-if="!loaded">
    <div class="col-2 prop-label">Lessons</div>
    <div class="col">
      Loading lessons...please hold tight. However, if you see this for longer than a few
      seconds, something went wrong.
    </div>
  </div>
  <div class="row" v-else>
    <div class="col-2 prop-label">Lessons</div>
    <div class="col">
      <q-list dense>
        <q-item dense v-for="lesson in lessonsInPath" :key="lesson.id">
          <q-item-section>
            {{ lesson.title }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-2 q-gutter-xs">
      <q-btn
        @click="newLessonDialog = true"
        icon="add_circle_outline"
        label="new"
        color="primary"
        dense
        no-caps
      />
      <q-btn
        @click="pickLessonDialog = true"
        icon="add_circle_outline"
        label="attach"
        color="primary"
        dense
        no-caps
      />
    </div>
  </div>

  <q-dialog v-model="newLessonDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Give the lesson a title</div>
        <div class="text-subtitle1">You can change it later.</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newLessonTitle"
          autofocus
          @keyup.enter="onCreateLessonFromDialog"
        />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          flat
          label="Create Lesson"
          @click="onCreateLessonFromDialog"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="pickLessonDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Pick an available lesson</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-select v-model="pickedLesson" :options="unassignedLessonOptions" />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          flat
          label="Include Lesson"
          @click="onAttachLessonFromDialog"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUpdate } from 'vue'
import { useCourseLabStore } from 'src/stores/course-lab.js'

const builder = useCourseLabStore()
const props = defineProps({
  courseId: { type: String, required: true },
  startingLessonPath: { type: Array, required: true },
})

const loaded = ref(false)
const nextLessonPath = ref([])
const unassignedLessonOptions = computed(() => {
  return builder.lessonsWithoutCourse.map((lesson) => ({
    label: lesson.title,
    value: lesson.id,
  }))
})

const lessonsInPath = computed(() => {
  return nextLessonPath.value.map((id) => {
    const cached = builder.cachedLesson(id)
    return cached ? cached : { id: 'bah' }
  })
})

const newLessonDialog = ref(false)
const newLessonTitle = ref('')

async function onCreateLessonFromDialog() {
  try {
    if (newLessonTitle.value && newLessonTitle.value != '') {
      await builder.spawnLesson(newLessonTitle.value, props.courseId)
    }
  } catch (err) {
    console.log(err)
  }
  newLessonDialog.value = false
}

const pickLessonDialog = ref(false)
const pickedLesson = ref(null)

async function onAttachLessonFromDialog() {
  try {
    const lessonOption = pickedLesson.value
    if (lessonOption) {
      await builder.handleAddLessonToCourse(props.courseId, lessonOption.value)
      pickedLesson.value = null
    }
  } catch (err) {
    console.log(err)
  }
  pickLessonDialog.value = false
}

onBeforeUpdate(() => {
  nextLessonPath.value = [...props.startingLessonPath]
})

onMounted(async () => {
  // load lessons on course and lessons without a course
  loaded.value = false
  await Promise.all([
    builder.loadLessonsForCourse(props.courseId),
    builder.loadLessonsWithoutCourse(),
  ])
  nextLessonPath.value = [...props.startingLessonPath]
  loaded.value = true
})
</script>

<style lang="scss" scoped></style>
