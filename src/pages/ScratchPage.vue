<template>
  <q-page flex flex-center>
    <div class="q-pa-md">
      <div class="text-h3 q-pt-lg q-pb-md text-primary">
        <q-img :src="Zanzibar" width="50px" position="0 0" alt="Zanzibar, Nuclear Hero" />
        Scratch Page
      </div>
      <div class="text-subtitle1 q-pb-lg text-blue-10">For trying things</div>
      <div class="q-py-sm">
        <q-card>
          <q-card-section>
            <div class="text-h6">Courses</div>
            <ul>
              <li v-for="course in courses" :key="course.id">
                {{ course.name }}
              </li>
            </ul>
            <q-input filled label="New Course Name" v-model="newCourseName" />
          </q-card-section>
          <q-card-actions>
            <q-btn @click="onFetchCourses" label="Fetch Courses" no-caps />
            <q-btn
              @click="onAddCourse"
              :disabled="newCourseName == ''"
              label="Add a Course"
              no-caps
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { fetchCourses, goCreateCourse } from '../api'
import Zanzibar from 'assets/Zanzibar.svg'

const courses = ref([])
const newCourseName = ref('')
async function onFetchCourses() {
  courses.value = await fetchCourses()
}
async function onAddCourse() {
  if (newCourseName.value && newCourseName.value != '') {
    const result = await createCourse(newCourseName.value)
    courses.value.push(result)
    newCourseName.value = ''
  }
}
</script>

<style lang="scss" scoped></style>
