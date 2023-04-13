<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h2 text-primary berkshire-swash">Lesson Lab</div>
        <div class="text-caption text-secondary berkshire-swash q-pl-xs">
          Where idealized knowledge sharing is discovered
        </div>
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-md q-gutter-md">
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
              v-for="lesson in lab.lessonList"
              :key="lesson.id"
              clickable
              :to="{ name: 'lessonBuilder', params: { id: lesson.id } }"
            >
              <q-item-section>
                <q-item-label>{{ lesson.title }}</q-item-label>
                <q-item-label caption lines="2">{{ lesson.subtitle }}</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label>{{ lesson.status }}</q-item-label>
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
            <q-item v-for="lesson in lab.lessonList" :key="lesson.id">
              <q-item-section>
                <q-item-label class="text-bold">{{ lesson.title }}</q-item-label>
                <q-item-label caption lines="2">{{ lesson.subtitle }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  @click="() => deleteLesson(lesson.id)"
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
          @keyup.enter="createLessonFromDialog"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Create Lesson" @click="createLessonFromDialog" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useLessonLabStore } from 'src/stores/lesson-lab'
import { ref, onBeforeMount } from 'vue'

const lab = useLessonLabStore()

const dangerZoneExpanded = ref(false)
const newLessonDialog = ref(false)
const newLessonTitle = ref('')

onBeforeMount(async () => {
  await lab.loadLessons()
})

async function createLessonFromDialog() {
  try {
    if (newLessonTitle.value != '') {
      await lab.spawnLesson(newLessonTitle.value)
      newLessonTitle.value = ''
    }
  } catch (err) {
    console.log(err)
  }
  newLessonDialog.value = false
}

async function deleteLesson(id) {
  await lab.purgeLesson(id)
}
</script>

<style lang="scss" scoped>
.scroller-style {
  height: 300px;
  max-width: 100%;
}
.dialog-style {
  width: 300px;
}
.section-style {
  border: 1px solid $primary;
}
</style>
