<template>
  <div v-if="!draftCourse" class="text-h3">Loading...</div>
  <div v-if="draftCourse" class="row">
    <div class="col q-pa-sm">
      <div class="text-h6">Update the Course</div>
      <q-card bordered>
        <q-card-section>
          <div class="text-caption">Course ID: {{ courseId }}</div>
          <q-input
            v-model="draftCourse.name"
            label="Name"
            class="lower-gap"
            dense
            outlined
          />
          <q-input
            v-model="draftCourse.description"
            label="Description"
            class="lower-gap"
            outlined
            dense
            autogrow
          />
          <q-input
            v-model="draftCourse.objectives"
            label="Objectives"
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
          <q-select
            outlined
            v-model="draftCourse.level"
            :options="levelOptions"
            label="Level"
            class="lower-gap"
            dense
          />
          <q-select
            outlined
            v-model="draftCourse.tags"
            :options="tagOptions"
            multiple
            emit-value
            clearable
            options-dense
            label="Tags"
            class="lower-gap"
            dense
          />
          <q-input
            v-model="draftCourse.notes"
            label="Notes"
            class="lower-gap"
            outlined
            dense
            autogrow
          />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            @click="saveCourse"
            dense
            no-caps
            icon="save"
            color="primary"
            label="Save"
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
                v-for="plan in builder.lessonPlanList"
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
      <q-separator spaced />
      <div class="text-h6">
        Or create a new lesson
        <q-btn @click="newLessonDialog = true" icon="add_circle" color="primary" />
      </div>
    </div>
  </div>
  <q-dialog v-model="newLessonDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Give the lesson a title</div>
        <div class="text-subtitle1">You can change it later.</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newLessonTitle"
          autofocus
          @keyup.enter="onCreateLessonFromDialog"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          flat
          label="Create Lesson"
          @click="onCreateLessonFromDialog"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUpdate } from 'vue'
import { useCourseBuilderStore } from 'stores/course-builder.js'
// import { CourseLevelOptions } from '../../../models'  TODO: why does this hang the page?

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['cancel'])

const builder = useCourseBuilderStore()

const newLessonDialog = ref(false)
const newLessonTitle = ref('')

const draftCourse = ref(null)
const courseLessons = computed(() =>
  draftCourse.value.lessons.map((id) => builder.lessonPlan(id))
)
const lessonCount = computed(() => draftCourse.value.lessons.length)

const levelOptions = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT', 'ALL']
const tagOptions = [
  'science',
  'particle-physics',
  'engineering',
  'nuclear-power-plants',
  'PWRs',
]

function onCreateLessonFromDialog() {
  if (newLessonTitle.value && newLessonTitle.value != '') {
    builder.spawnLesson(newLessonTitle)
  }
  newLessonDialog.value = false
}
function addLessonToCourse(id) {
  draftCourse.value.lessons.push(id)
}
function removeFromCourseLessons(index) {
  console.log('lesson in position ' + index)
  draftCourse.value.lessons.splice(index, 1)
}
function bumpSort(index, direction = 0) {
  const lessons = draftCourse.value.lessons
  const value = lessons[index]
  const toIndex = direction < 0 ? index - 1 : index + 1
  lessons.splice(index, 1)
  lessons.splice(toIndex, 0, value)
}
async function saveCourse() {
  await builder.updateCourse(draftCourse.value)
  emit('cancel')
}
function prepForEdit() {
  const given = builder.course(props.courseId)
  draftCourse.value = { ...given }

  // deep copy arrays
  draftCourse.value.lessons = given.lessons ? given.lessons.slice() : []
  draftCourse.value.tags = given.tags ? given.tags.slice() : []
}
onMounted(() => {
  prepForEdit()
})
</script>

<style lang="scss" scoped>
.lower-gap {
  margin-bottom: 0.5em;
}
</style>
