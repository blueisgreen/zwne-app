<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h2 text-primary">Course Builder</div>
        <div class="text-caption text-secondary q-pl-xs">
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
        <div class="col">
          <div class="text-center text-h6">About This Course</div>
        </div>
      </div>
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
        <div class="col-2 prop-label">Objectives</div>
        <div class="col">
          {{ courseToBuild.objectives }}
        </div>
      </div>
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Level</div>
        <div class="col">{{ courseToBuild.level }}</div>
      </div>
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Tags</div>
        <div class="col">{{ tagListDisplay }}</div>
      </div>
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Notes (internal)</div>
        <div class="col">{{ courseToBuild.notes }}</div>
      </div>
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Lessons</div>
        <div class="col">
          <ul>
            <li v-for="lesson in courseLessonList" :key="lesson.id">
              <router-link :to="{ name: 'lessonPlanner', params: { id: lesson.id } }">{{
                lesson.title
              }}</router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="row q-pb-sm">
        <div class="col">
          <q-separator spaced />
          <div class="text-center text-h6">Cover Art</div>
        </div>
      </div>
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Banner</div>
        <div class="col">
          {{
            courseToBuild.bannerImageUrl ||
            'https://cdn.zanzisworld.com/courses/images/banner' +
              courseToBuild.id +
              '.png'
          }}
        </div>
        <div class="col-1">
          <q-btn icon="edit" dense @click="onEditImage" />
        </div>
      </div>
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Cover</div>
        <div class="col">
          {{
            courseToBuild.bannerImageUrl ||
            'https://cdn.zanzisworld.com/courses/images/cover' + courseToBuild.id + '.png'
          }}
        </div>
        <div class="col-1">
          <q-btn icon="edit" dense @click="onEditImage" />
        </div>
      </div>

      <div class="row q-pb-sm">
        <div class="col">
          <q-separator spaced />
          <div class="text-center text-h6">Other Information</div>
        </div>
      </div>
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Course ID</div>
        <div class="col">{{ courseToBuild.id }}</div>
      </div>
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Last Update</div>
        <div class="col">{{ courseToBuild.updatedAt || 'Unknown' }}</div>
      </div>
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Status</div>
        <div class="col">{{ courseToBuild.status || 'Unknown' }}</div>
      </div>
      <div class="row q-pb-sm">
        <div class="col-2 prop-label">Change Availability</div>
        <div class="col">
          <q-btn-group glossy>
            <q-btn
              v-if="courseToBuild.status === 'CLOSED'"
              @click.stop="() => builder.openCourse(courseId)"
              label="Open"
              no-caps
              color="secondary"
            />
            <q-btn
              v-if="courseToBuild.status === 'OPEN'"
              @click.stop="() => builder.closeCourse(courseId)"
              label="Close"
              no-caps
              color="secondary"
            />
            <q-btn
              v-if="courseToBuild.status === 'CLOSED' || courseToBuild.status === 'OPEN'"
              @click.stop="() => builder.archiveCourse(courseId)"
              label="Archive"
              no-caps
              color="accent"
            />
            <q-btn
              v-if="courseToBuild.status === 'ARCHIVED'"
              @click.stop="() => builder.reviveCourse(courseId)"
              label="Restore"
              no-caps
              color="accent"
            />
          </q-btn-group>
        </div>
      </div>
    </div>

    <div v-if="courseToBuild && editMode">
      <course-details :course="courseToBuild" @cancel="onCancelEdit" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseBuilderStore } from 'stores/course-builder.js'
import CourseDetails from './CourseDetails.vue'

const route = useRoute()
const courseId = route.params.id

const builder = useCourseBuilderStore()
const courseToBuild = computed(() => {
  return builder.course(courseId)
})
const courseLessonList = computed(() => {
  // TODO: put this with store logic
  // return courseToBuild.value
  //   ? courseToBuild.value.lessons.map((lessonId) => builder.lessonPlan(lessonId))
  //   : []
  return []
})
const tagListDisplay = computed(() => {
  const { tags } = courseToBuild.value
  return tags
    ? courseToBuild.value.tags.reduce((accum, tag) => accum + `#${tag} `, '')
    : ''
})
const editMode = ref(false)

function onEditCourse() {
  builder.loadLessons()
  editMode.value = true
}
function onCancelEdit() {
  editMode.value = false
}
function onEditImage() {
  alert('This will bring up a fancy image picker, someday.')
}

onMounted(async () => {
  console.log('CourseBuilderPage.onMounted')
  if (courseId) {
    // TODO: add loading indicator
    await builder.loadCourse(courseId)
  } else {
    console.error('Failed to load. Course ID unknown.')
  }
})
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
