<template>
  <q-dialog v-model="newCourseDialog">
    <q-card>
      <q-card-section>
        <q-input v-model="newCourseName" outlined label="Name" />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Cancel" v-close-popup />
        <q-btn label="Create" @click="onNewCourse" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useCourseBuilderStore } from 'stores/course-builder'
import { ref } from 'vue'
const builder = useCourseBuilderStore()

const newCourseDialog = ref(false)
const newCourseName = ref('')

function onNewCourse() {
  if (newCourseName.value != '') {
    builder.spawnCourse(newCourseName.value)
    newCourseName.value = ''
  }
  newCourseDialog.value = false
}
</script>

<style lang="scss" scoped></style>
