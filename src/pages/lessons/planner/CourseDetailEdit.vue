<template>
  <div v-if="!draftCourse" class="text-h3">Loading...</div>
  <div v-if="draftCourse" class="row">
    <div class="col q-pa-sm">
      <div class="text-h6">Update the Course</div>
      <q-card bordered>
        <q-card-section>
          <div class="text-caption">Course ID: {{ course.id }}</div>
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
          <q-select
            outlined
            v-model="draftCourse.level"
            :options="levelOptions"
            emit-value
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
          <q-list bordered separator padding class="lower-gap">
            <q-item-label header>Lessons in Course</q-item-label>
            <q-item v-if="!draftLessonCount" class="text-secondary"
              >Add at least one lesson</q-item
            >
            <q-item v-for="(lesson, index) in draftLessons" :key="lesson.id">
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
                    v-if="draftLessonCount > 1 && index > 0"
                    @click="() => bumpSort(index, -1)"
                    icon="arrow_upward"
                    dense
                  />
                  <q-btn
                    v-if="draftLessonCount > 1 && index < draftLessonCount - 1"
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
            @click="onSaveCourse"
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
      <q-separator spaced />
      <div class="text-h6">
        Or create a new lesson
        <q-btn
          @click="newLessonDialog = true"
          icon="add_circle"
          color="primary"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCourseLabStore } from 'src/stores/course-lab.js'
import { CourseLevel } from '../../../models'

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['cancel'])

const builder = useCourseLabStore()
const draftCourse = ref({})
const draftLessonPath = computed(() => draftCourse.value.lessonPath)
const draftLessonCount = computed(() =>
  draftCourse.value.lessonPath ? draftLessonPath.value.length : 0
)
const draftLessons = computed(() => {
  if (!draftLessonPath.value) {
    return []
  }
  const lessons = draftLessonPath.value.map((id) => builder.lessonPlan(id))
  return lessons
})
const levelOptions = Object.keys(CourseLevel).map((level) => ({
  value: level,
  label: level.substring(0, 1).toUpperCase() + level.substring(1).toLowerCase(),
}))
// TODO: build proper tag cloud
const tagOptions = [
  'physics',
  'chemistry',
  'thermodynamics',
  'electrodynamics',
  'fluids',
  'nuclear-physics',
  'particle-physics',
  'engineering',
  'civil-engineering',
  'electrical-engineering',
  'mechanical-engineering',
  'environmental-engineering',
  'nuclear-power-plants',
  'boiling-water-reactor',
  'pressurized-water-reactor',
  'fusion-reactor',
  'gen-iv-nuclear',
  'liquid-salt-reactor',
  'liquid-metal-reactor',
  'nuclear-waste',
  'nuclear-accidents',
]

const newLessonDialog = ref(false)
const newLessonTitle = ref('')

async function onCreateLessonFromDialog() {
  try {
    if (newLessonTitle.value && newLessonTitle.value != '') {
      await builder.spawnLesson(newLessonTitle.value)
    }
  } catch (err) {
    console.log(err)
  }
  newLessonDialog.value = false
}
function addLessonToCourse(id) {
  console.log('addLessonToCourse', id)
  draftLessonPath.value.push(id)
}
function removeFromCourseLessons(index) {
  console.log('lesson in position', index)
  draftLessonPath.value.splice(index, 1)
}
function bumpSort(index, direction = 0) {
  console.log('bumpSort, { index, direction }')
  const lessonIds = draftLessonPath.value
  const value = lessonIds[index]
  const toIndex = direction < 0 ? index - 1 : index + 1
  lessonIds.splice(index, 1)
  lessonIds.splice(toIndex, 0, value)
}
async function onSaveCourse() {
  console.log('onSaveCourse', draftCourse.value)
  await builder.onSaveCourse(draftCourse.value)
  emit('cancel')
}
onMounted(() => {
  console.log('CourseBuilder.onMounted')
  const { id, name, description, objectives, level, tags, notes, lessonPath } =
    props.course
  draftCourse.value = {
    id,
    name,
    description,
    objectives,
    level,
    notes,
    tags: tags ? [...tags] : [],
    lessonPath: lessonPath ? [...lessonPath] : [],
  }
})
</script>

<style lang="scss" scoped>
.lower-gap {
  margin-bottom: 0.5em;
}
</style>
