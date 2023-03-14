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

    <div v-if="courseToBuild" class="q-pa-md">
      <div class="row">
        <div class="col-2">Name</div>
        <div class="col">{{ courseToBuild.name }}</div>
      </div>
      <div class="row">
        <div class="col-2">Description</div>
        <div class="col">{{ courseToBuild.description }}</div>
      </div>
      <div class="row">
        <div class="col-2">Lessons</div>
        <div class="col">
          <ul class="flat-list">
            <li v-for="lesson in courseLessons" :key="lesson.id">
              {{ lesson.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <course-builder :edit="id" /> -->

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
// import CourseBuilder from './CourseBuilder.vue'
import { ref, computed, onBeforeMount, onMounted, watch } from 'vue'
import { useCourseBuilderStore } from 'stores/course-builder.js'
import { useRoute } from 'vue-router'

const builder = useCourseBuilderStore()

const route = useRoute()
const courseId = route.params.id
console.log('course ID: ' + courseId)
const target = builder.course(courseId)
console.log('course: ' + JSON.stringify(target))
const courseToBuild = ref(target)
const courseLessons = computed(() =>
  courseToBuild.value.lessons.map((id) => builder.lessonPlan(id))
)
const copyForEdit = ref(null)
const editMode = ref(false)

// watch(
//   () => route.params.id,
//   (newId) => {
//     console.log('watch invoked: ' + newId)
//     courseToBuild.value = builder.course(newId)
//   }
// )

function editCourse() {
  copyForEdit.value = { ...courseToBuild }
  editMode.value = true
}
function cancelEdit() {
  editMode.value = false
}
function showLifecycleAlert() {
  alert('Implement course lifecycle actions')
}
// onBeforeMount(() => {
//   console.log('onBeforeMount: id=' + props.id)
//   console.log('onBeforeMount: props id=' + route.props.id)
//   courseToBuild.value = builder.course(props.id)
//   // courseLessons.value = courseToBuild.value.lessons.map((id) => courseBuilder.lessonPlan(id))
// })
// onMounted(() => {
//   console.log('onBeforeMount: id=' + props.id)
// })
</script>

<style lang="scss" scoped>
.lower-gap {
  margin-bottom: 0.5em;
}
ul {
  margin-top: 0;
  margin-left: -1.5em;
}
</style>
