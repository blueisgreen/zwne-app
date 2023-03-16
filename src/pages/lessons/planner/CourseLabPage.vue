<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-md">
      <div class="text-h2 text-primary">Course Laboratory</div>
      <div class="text-subtitle1 text-secondary">
        Where idealized knowledge sharing is discovered
      </div>
      <div class="section-style shadow-3">
        <q-toolbar>
          <q-toolbar-title>Courses</q-toolbar-title>
          <q-btn
            label="Add Course"
            icon="add_circle"
            @click="newCourseDialog = true"
            color="primary"
            dense
            no-caps
          />
        </q-toolbar>
        <q-scroll-area class="scroller-style">
          <q-list>
            <q-item
              v-for="course in builder.courseList"
              :key="course.id"
              clickable
              :to="{ name: 'courseBuilder', params: { id: course.id } }"
            >
              <q-item-section>
                <q-item-label>{{ course.name }}</q-item-label>
                <q-item-label caption lines="2">{{ course.description }}</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label>{{ course.status }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
      <div class="section-style shadow-3">
        <q-toolbar>
          <q-toolbar-title>Lessons</q-toolbar-title>
          <q-btn
            label="Add Lesson"
            icon="add_circle"
            @click="newLessonDialog = true"
            color="primary"
            dense
            no-caps
          />
        </q-toolbar>
        <q-scroll-area class="scroller-style">
          <q-list>
            <q-item
              v-for="lessonPlan in builder.lessonPlanList"
              :key="lessonPlan.id"
              clickable
              :to="{ name: 'lessonPlanner', params: { id: lessonPlan.id } }"
            >
              <q-item-section>
                <q-item-label>{{ lessonPlan.title }}</q-item-label>
                <q-item-label caption lines="2">{{ lessonPlan.subtitle }}</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label>{{ getStatus(lessonPlan) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
  <q-dialog v-model="newCourseDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Give the course a name</div>
        <div class="text-subtitle1">You can change it later.</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newCourseName"
          autofocus
          @keyup.enter="onCreateCourseFromDialog"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          flat
          label="Create Course"
          @click="onCreateCourseFromDialog"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
</template>

<script setup>
import { useCourseBuilderStore } from 'stores/course-builder'
import { ref, onBeforeMount } from 'vue'

const builder = useCourseBuilderStore()

const newCourseDialog = ref(false)
const newCourseName = ref('')
const newLessonDialog = ref(false)
const newLessonTitle = ref('')

onBeforeMount(async () => {
  await builder.loadCourses()
})

async function onCreateCourseFromDialog() {
  try {
    if (newCourseName.value && newCourseName.value != '') {
      await builder.spawnCourse(newCourseName.value)
    }
  } catch (err) {
    console.log(err)
  }
  newCourseDialog.value = false
}
function onCreateLessonFromDialog() {
  if (newLessonTitle.value && newLessonTitle.value != '') {
    builder.spawnLesson(newLessonTitle.value)
  }
  newLessonDialog.value = false
}
function getStatus(lesson) {
  return lesson.archivedAt ? 'archived' : lesson.publishedAt ? 'published' : 'draft'
}
</script>

<style lang="scss" scoped>
.scroller-style {
  height: 200px;
  max-width: 100%;
}
.dialog-style {
  width: 300px;
}
.section-style {
  border: 1px solid $primary;
}
</style>
