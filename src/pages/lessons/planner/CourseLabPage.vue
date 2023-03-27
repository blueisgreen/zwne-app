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
              v-for="course in builder.cachedCourseList"
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
              <q-item-section side top>
                <q-item-label>{{ course.status }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
      <div class="section-style shadow-3">
        <q-expansion-item
          v-model="dangerZoneExpanded"
          icon="warning"
          label="Danger Zone"
          caption="Use with care"
        >
          <div class="text-accent text-h4 text-center">
            Be careful! Actions taken here are irreversible.
          </div>
          <q-list>
            <q-item v-for="course in builder.courseList" :key="course.id">
              <q-item-section>
                <q-item-label class="text-bold">{{ course.name }}</q-item-label>
                <q-item-label caption lines="2">{{
                  course.description
                }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  @click="() => onDeleteCourse(course.id)"
                  icon="delete"
                  dense
                  color="accent"
                  label="Delete Course"
                />
              </q-item-section> </q-item
          ></q-list>
        </q-expansion-item>
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
import { useCourseLabStore } from 'src/stores/course-lab'
import { ref, onBeforeMount } from 'vue'

const builder = useCourseLabStore()

const newCourseDialog = ref(false)
const newCourseName = ref('')
const newLessonDialog = ref(false)
const newLessonTitle = ref('')
const dangerZoneExpanded = ref(false)

onBeforeMount(async () => {
  await Promise.all([builder.loadCourses(), builder.loadLessons()])
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

async function onDeleteCourse(id) {
  await builder.handleDeleteCourse(id)
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
