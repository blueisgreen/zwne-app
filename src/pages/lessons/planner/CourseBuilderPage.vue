<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h2 text-primary">Course Builder</div>
        <div class="text-caption text-secondary">
          Bundle lessons into enjoyable courses to maximize understanding.
        </div>
      </q-toolbar-title>
      <q-btn :to="{ name: 'courseLab' }" color="primary" no-caps>To Course Lab</q-btn>
    </q-toolbar>

    <div v-if="!courseToBuild" class="q-pa-md">
      <div class="text-h4">Loading...</div>
      <div class="q-my-md">
        If you get stuck here for more than a few seconds, it means we did not find the
        course with the ID of
        <span class="text-bold">{{ courseId }}</span
        >. Return to
        <router-link :to="{ name: 'courseLab' }">the Lab entrance</router-link>
        and choose something from the list of courses.
      </div>
      <div class="q-my-md">
        If you just tried that and are still stuck, something else must be wrong. Sorry
        about that.
      </div>
    </div>

    <div v-if="courseToBuild && !editMode" class="q-ma-md q-pa-md course-info shadow-3">
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Name</div>
        <div class="col">{{ courseToBuild.name }}</div>
        <q-page-sticky position="top-right" :offset="[40, 120]">
          <q-btn fab icon="edit" color="accent" @click="onEditCourse" />
        </q-page-sticky>
      </div>
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Description</div>
        <div class="col">{{ courseToBuild.description }}</div>
      </div>
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Lessons</div>
        <div class="col">
          <ul>
            <li v-for="lesson in courseLessonList" :key="lesson.id">
              {{ lesson.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="courseToBuild && editMode">
      <course-builder :course-id="courseToBuild.id" @cancel="onCancelEdit" />
    </div>

    <div class="text-center">
      Course Lifecycle Actions:
      <q-btn-group glossy>
        <q-btn @click.stop="showLifecycleAlert" label="Share" no-caps color="secondary" />
        <q-btn @click.stop="showLifecycleAlert" label="Hide" no-caps color="secondary" />
        <q-btn @click.stop="showLifecycleAlert" label="Archive" no-caps color="accent" />
        <q-btn @click.stop="showLifecycleAlert" label="Restore" no-caps color="accent" />
      </q-btn-group>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseBuilderStore } from 'stores/course-builder.js'
import CourseBuilder from './CourseBuilder.vue'

const route = useRoute()
const builder = useCourseBuilderStore()

const courseId = route.params.id
const target = builder.course(courseId)
const courseToBuild = ref(target)
const courseLessonList = computed(() =>
  courseToBuild.value.lessons.map((id) => builder.lessonPlan(id))
)
const editMode = ref(false)

function onEditCourse() {
  editMode.value = true
}
function onCancelEdit() {
  editMode.value = false
}
function showLifecycleAlert() {
  alert('Implement course lifecycle actions')
}
</script>

<style lang="scss" scoped>
.lower-gap {
  margin-bottom: 0.5em;
}

.course-info {
  margin-top: 1em;
  border: 1px solid $primary;
  .prop-label {
    font-weight: bold;
    color: $primary;
  }
  ul {
    margin-top: 0;
    margin-left: -1.5em;
  }
}
</style>
