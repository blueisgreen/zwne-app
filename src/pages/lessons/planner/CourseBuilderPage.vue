<template>
  <q-page padding>
    <div class="row">
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
                  <q-btn
                    @click="() => removeFromCourseLessons(index)"
                    icon="delete"
                    dense
                  />
                </q-item-section>
              </q-item>
            </q-list>
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
function addLessonToCourse(id) {
  course.value.lessons.push(id)
}
function removeFromCourseLessons(index) {
  console.log('lesson in position ' + index)
  course.value.lessons.splice(index, 1)
}
</script>

<style lang="scss" scoped></style>
