<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-md">
      <div class="text-h1">Course Laboratory</div>
      <div class="text-subtitle1">
        Where idealized knowledge sharing is discovered
      </div>
      <div>
        <q-toolbar>
          <q-toolbar-title>Courses</q-toolbar-title>
          <q-btn
            label="Add Course"
            icon="add_circle"
            @click="onNewCourse"
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
                <q-item-label caption lines="2">{{
                  course.description
                }}</q-item-label>
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
                <q-item-label caption lines="2">{{
                  lessonPlan.subtitle
                }}</q-item-label>
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

function onNewCourse() {
  builder.spawnCourse()
}
</script>

<style lang="scss" scoped>
.scroller-style {
  height: 200px;
  max-width: 500px;
}
.dialog-style {
  width: 300px;
}
</style>
