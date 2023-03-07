<template>
  <div class="row">
    <div class="col q-pa-sm">
      <div class="text-h6">Define the Course</div>
      <q-card bordered>
        <q-card-section>
          <div class="text-caption" v-if="edit">Course ID: {{ edit }}</div>
          <q-input v-model="course.name" label="Name" class="lower-gap" dense outlined />
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
                <q-item-label class="text-bold">{{ lesson.title }}</q-item-label>
                <q-item-label class="text-secondary">{{ lesson.subtitle }}</q-item-label>
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
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            v-if="edit"
            @click="saveCourse"
            dense
            no-caps
            icon="save"
            color="primary"
            label="Update It"
          />
          <q-btn
            v-if="!edit"
            @click="addCourse"
            dense
            no-caps
            icon="save"
            color="primary"
            label="Create It"
          />
          <q-btn
            @click="$emit('cancel')"
            dense
            no-caps
            icon="cancel"
            color="accent"
            label="Cancel"
          />
        </q-card-actions>
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
                  <q-item-label class="text-bold">{{ plan.title }}</q-item-label>
                  <q-item-label caption class="text-secondary">{{
                    plan.subtitle
                  }}</q-item-label>
                  <q-item-label lines="2"><span v-html="plan.content" /></q-item-label>
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
import { ref, computed, onMounted, onBeforeUpdate } from 'vue'
import { useCourseBuilderStore } from 'stores/course-builder.js'

const props = defineProps({
  edit: {
    type: String,
    required: false,
  },
})

defineEmits(['cancel'])

const courseBuilder = useCourseBuilderStore()
const course = ref({ lessons: [] })
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
function addCourse() {
  courseBuilder.createCourse(
    course.value.name,
    course.value.description,
    course.value.lessons
  )
}
function saveCourse() {
  courseBuilder.saveCourse(
    props.edit,
    course.value.name,
    course.value.description,
    course.value.lessons
  )
}

function prepForEdit() {
  if (props.edit) {
    const given = courseBuilder.course(props.edit)
    course.value = {
      name: given.name,
      description: given.description,
      lessons: given.lessons.slice(),
    }
  } else {
    course.value = {
      name: '',
      description: '',
      lessons: [],
    }
  }
}
onMounted(() => {
  prepForEdit()
})
onBeforeUpdate(() => {
  prepForEdit()
})
</script>

<style lang="scss" scoped>
.lower-gap {
  margin-bottom: 0.5em;
}
</style>
