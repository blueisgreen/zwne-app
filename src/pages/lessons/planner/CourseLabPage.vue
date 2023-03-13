<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-md">
      <div class="text-h1">Course Laboratory</div>
      <div class="text-subtitle1">Where idealized knowledge sharing is discovered</div>
      <div>
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
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
      <div>
        <div class="text-h2">Lessons</div>
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
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
      <q-dialog v-model="newCourseDialog">
        <q-card>
          <q-card-section>
            <q-input v-model="newCourseName" outlined label="Name" />
          </q-card-section>
          <q-card-actions>
            <q-btn label="Cancel" v-close-popup />
            <q-btn label="Create" @click="onNewCourse" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { useCourseBuilderStore } from 'stores/course-builder'
import { ref } from 'vue'
import NewCourseDialog from './NewCourseDialog.vue'

const builder = useCourseBuilderStore()

const newCourseDialog = ref(false)
const newCourseName = ref('')

const newLessonDialog = ref(false)

function onNewCourse() {
  if (newCourseName.value != '') {
    builder.spawnCourse(newCourseName.value)
    newCourseName.value = ''
  }
}
</script>

<style lang="scss" scoped>
.scroller-style {
  height: 200px;
  max-width: 500px;
}
</style>
