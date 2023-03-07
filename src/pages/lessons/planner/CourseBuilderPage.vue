<template>
  <q-page padding>
    <div class="text-h3">Course Builder</div>
    <div v-if="!courseBuilder.courseCount">
      You seem to have no courses. Go ahead and add one.
    </div>

    <div class="text-h6">Courses</div>
    <q-list bordered separator class="lower-gap">
      <q-item
        v-for="course in courseBuilder.courseList"
        :key="course.id"
        dense
        clickable
        @click="() => editCourse(course.id)"
      >
        <q-item-section>
          <q-item-label class="text-bold">{{ course.name }}</q-item-label>
          <q-item-label>{{ course.description }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-btn-group glossy>
            <q-btn
              @click.stop="showLifecycleAlert"
              label="Share"
              no-caps
              color="secondary"
            />
            <q-btn
              @click.stop="showLifecycleAlert"
              label="Hide"
              no-caps
              color="secondary"
            />
            <q-btn
              @click.stop="showLifecycleAlert"
              label="Archive"
              no-caps
              color="accent"
            />
            <q-btn
              @click.stop="showLifecycleAlert"
              label="Restore"
              no-caps
              color="accent"
            />
          </q-btn-group>
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn
      label="Add Course"
      @click="() => editCourse()"
      icon="add_circle"
      dense
      no-caps
      color="primary"
      class="lower-gap"
    />
    <q-separator />
    <course-builder
      v-if="showAddCourse"
      :edit="courseToEdit"
      @cancel="cancelEdit"
    />
  </q-page>
</template>

<script setup>
import CourseBuilder from './CourseBuilder.vue'
import { ref, computed } from 'vue'
import { useCourseBuilderStore } from 'stores/course-builder.js'

const courseBuilder = useCourseBuilderStore()
const showAddCourse = ref(false)
const courseToEdit = ref(null)

function editCourse(id) {
  courseToEdit.value = id
  showAddCourse.value = true
}
function cancelEdit() {
  showAddCourse.value = false
}
function showLifecycleAlert() {
  alert('Implement course lifecycle actions')
}
</script>

<style lang="scss" scoped>
.lower-gap {
  margin-bottom: 0.5em;
}
</style>
