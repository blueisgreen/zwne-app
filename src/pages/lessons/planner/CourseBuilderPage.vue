<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="text-h4 text-center">Course Builder</div>
      </div>
    </div>
    <div class="row">
      <div class="col q-pa-sm">
        <q-card bordered>
          <q-card-section>
            <div class="text-h6">Course</div>
            <q-input v-model="course.name" label="Name" />
            <q-input
              v-model="course.description"
              label="Description"
              autogrow
            />
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item-label header>Lessons in Course</q-item-label>
              <q-item v-for="(lesson, index) in courseLessons" :key="lesson.id">
                <q-item-section>
                  <q-item-label>{{ lesson.title }}</q-item-label>
                </q-item-section>
                <q-space />
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
          </q-card-section>
          <q-card-actions>
            <q-btn @click="saveCourse">Save this Course</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col q-pa-sm">
        <q-card bordered>
          <q-card-section>
            <div class="text-h6">Available Lessons</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-scroll-area style="height: 500px">
              <q-list>
                <q-item
                  v-for="plan in courseBuilder.lessonPlanList"
                  :key="plan.id"
                  dense
                  clickable
                  @click="() => addLessonToCourse(plan.id)"
                >
                  <q-item-section>
                    <q-item-label>{{ plan.title }}</q-item-label>
                    <q-item-label caption>{{ plan.subtitle }}</q-item-label>
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
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCourseBuilderStore } from 'stores/course-builder.js'

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

<style lang="scss" scoped></style>
