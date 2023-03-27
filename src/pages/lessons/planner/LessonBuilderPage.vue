<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-md">
      <div class="text-h2 text-primary">Lesson Builder</div>
      <div class="text-subtitle1 text-secondary">
        One kernel of knowledge at a time
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
            <q-item v-for="lesson in builder.cachedLessonList" :key="lesson.id">
              <q-item-section>
                <q-item-label>{{ lesson.title }}</q-item-label>
                <q-item-label caption lines="2">{{
                  lesson.subtitle
                }}</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-btn
                  v-if="lesson.courseID"
                  label="on course"
                  :to="{
                    name: 'courseBuilder',
                    params: { id: lesson.courseID },
                  }"
                  dense
                  no-caps
                />
                <q-btn
                  label="edit"
                  icon="edit"
                  :to="{
                    name: 'lessonPlanner',
                    params: { id: lesson.id },
                  }"
                  dense
                  no-caps
                />
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
            <q-item v-for="course in builder.cachedLessonList" :key="course.id">
              <q-item-section>
                <q-item-label class="text-bold">{{ course.name }}</q-item-label>
                <q-item-label caption lines="2">{{
                  course.description
                }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  @click="() => onDeleteLesson(lesson.id)"
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

const newLessonDialog = ref(false)
const newLessonTitle = ref('')

const dangerZoneExpanded = ref(false)

onBeforeMount(async () => {
  await builder.loadLessons()
})

async function onCreateLessonFromDialog() {
  try {
    if (newLessonTitle.value && newLessonTitle.value != '') {
      await builder.spawnLesson(newLessonTitle.value)
    }
  } catch (err) {
    console.log(err)
  }
  newLessonDialog.value = false
}

async function onDeleteLesson(id) {
  await builder.handleDeleteLesson(id)
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
