<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Course Builder</div>
        <div class="text-caption text-secondary">
          Bundle lessons into enjoyable courses to maximize understanding.
        </div>
      </q-toolbar-title>
      <q-btn :to="{ name: 'courseLab' }" color="primary" no-caps
        >To Course Lab</q-btn
      >
    </q-toolbar>

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
import { ref } from 'vue'
import { useCourseBuilderStore } from 'stores/course-builder.js'

const courseBuilder = useCourseBuilderStore()
const showAddCourse = ref(false)
const courseToEdit = ref(null)

const props = defineProps({ id: String })

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
