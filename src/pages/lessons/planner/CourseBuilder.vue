<template>
  <div class="row">
    <div class="col q-pa-sm">
      <div class="text-h6">Define the Course</div>
      <q-card bordered>
        <q-card-section>
          <q-input
            v-model="course.name"
            label="Name"
            class="lower-gap"
            dense
            outlined
          />
          <q-input
            v-model="course.description"
            label="Description"
            class="lower-gap"
            outlined
            dense
            autogrow
          />
          <q-list bordered separator padding class="lower-gap">
            <q-item-label header>Lessons in Course</q-item-label>
            <q-item v-if="!lessonCount" class="text-secondary"
              >Add at least one lesson</q-item
            >
            <q-item v-for="(lesson, index) in courseLessons" :key="lesson.id">
              <q-item-section>
                <q-item-label class="text-bold">{{
                  lesson.title
                }}</q-item-label>
                <q-item-label class="text-secondary">{{
                  lesson.subtitle
                }}</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-btn-group push>
                  <q-btn
                    v-if="lessonCount > 1 && index > 0"
                    @click="() => bumpSort(index, -1)"
                    icon="arrow_upward"
                    dense
                  />
                  <q-btn
                    v-if="lessonCount > 1 && index < lessonCount - 1"
                    @click="() => bumpSort(index)"
                    icon="arrow_downward"
                    dense
                  />
                  <q-btn
                    @click="() => removeFromCourseLessons(index)"
                    icon="delete"
                    dense
                  />
                </q-btn-group>
              </q-item-section>
            </q-item>
          </q-list>
          <q-btn
            @click="saveCourse"
            dense
            no-caps
            icon="save"
            color="primary"
            label="Create It"
          />
        </q-card-section>
      </q-card>
      <div class="q-pa-sm"></div>
    </div>
    <div class="col q-pa-sm">
      <div class="text-h6">Pick Lessons to Include</div>
      <q-card bordered>
        <q-card-section>
          <q-scroll-area style="height: 350px">
            <q-list bordered separator padding>
              <q-item
                v-for="plan in courseBuilder.lessonPlanList"
                :key="plan.id"
                dense
                clickable
                @click="() => addLessonToCourse(plan.id)"
              >
                <q-item-section top>
                  <q-item-label class="text-bold">{{
                    plan.title
                  }}</q-item-label>
                  <q-item-label caption class="text-secondary">{{
                    plan.subtitle
                  }}</q-item-label>
                  <q-item-label lines="2"
                    ><span v-html="plan.content"
                  /></q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCourseBuilderStore } from 'stores/course-builder.js'

const props = defineProps({
  edit: {
    type: String,
    required: false,
  },
})
const courseBuilder = useCourseBuilderStore()
const course = ref({
  name: '',
  description: '',
  lessons: [],
})
const courseLessons = computed(() =>
  course.value.lessons.map((id) => courseBuilder.lessonPlan(id))
)
const lessonCount = computed(() => course.value.lessons.length)
function addLessonToCourse(id) {
  course.value.lessons.push(id)
}
function removeFromCourseLessons(index) {
  console.log('lesson in position ' + index)
  course.value.lessons.splice(index, 1)
}
function bumpSort(index, direction = 0) {
  const lessons = course.value.lessons
  const value = lessons[index]
  const toIndex = direction < 0 ? index - 1 : index + 1
  lessons.splice(index, 1)
  lessons.splice(toIndex, 0, value)
}
function saveCourse() {
  courseBuilder.createCourse(
    course.value.name,
    course.value.description,
    course.value.lessons
  )
}
</script>

<style lang="scss" scoped>
.lower-gap {
  margin-bottom: 0.5em;
}
</style>
