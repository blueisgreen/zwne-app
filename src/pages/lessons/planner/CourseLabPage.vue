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
            @click="builder.spawnCourse"
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
            @click="builder.spawnLesson"
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
</template>

<script setup>
import { useCourseBuilderStore } from 'stores/course-builder'

const builder = useCourseBuilderStore()

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
