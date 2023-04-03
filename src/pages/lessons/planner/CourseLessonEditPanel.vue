<template>
  <div v-if="!loaded">
    Loading...please hold tight...but if you see this for longer than a few
    seconds, something went wrong.
  </div>
  <div class="row" v-else>
    <div class="col-2 prop-label">Lessons</div>
    <div class="col">
      <q-list dense>
        <q-item dense v-for="lesson in lessonsInPath" :key="lesson.id">
          <q-item-section>
            <router-link
              :to="{ name: 'lessonPlanner', params: { id: lesson.id } }"
              >{{ lesson.title }}
            </router-link>
          </q-item-section>
          <q-item-section side>
            <q-btn
              icon="remove_circle_outline"
              color="accent"
              dense
              no-caps
              label="remove"
              @click="() => onRemoveLesson(lesson.id)"
            />
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
import { computed, onMounted } from 'vue'
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
  return nextLessonPath.value.map((id) => builder.cachedLesson(id))
})

onMounted(async () => {
  // load lessons on course and lessons without a course
  await Promise.all([
    builder.loadLessonsForCourse(props.courseId),
    builder.lessonsWithoutCourse(),
  ])
  nextLessonPath.value = [...props.startingLessonPath]
  loaded.value = true
})
</script>

<style lang="scss" scoped></style>
