<template>
  <div v-if="!lesson">
    <div class="text-h3">Choose a plan to inspect</div>
  </div>
  <div v-if="!!lesson">
    <q-card bordered>
      <q-card-section>
        <q-toolbar>
          <q-toolbar-title>Lesson Information</q-toolbar-title>
          <span v-if="!editMode"
            ><q-btn
              @click="onEdit"
              label="Edit"
              dense
              no-caps
              icon="edit"
              color="secondary"
          /></span>
          <span v-if="editMode">
            <q-btn label="Save" color="primary" @click="onSave" />
            <q-btn
              label="Cancel"
              @click="onCancelEdit"
              color="primary"
              flat
              class="q-ml-sm"
          /></span>
        </q-toolbar>
      </q-card-section>
      <q-card-section v-if="!editMode">
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Title</div>
          <div class="col">{{ lesson.title }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Subtitle</div>
          <div class="col">{{ lesson.subtitle }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Category</div>
          <div class="col">{{ displayCategories }}</div>
        </div>
      </q-card-section>
      <q-card-section v-if="editMode">
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Title</div>
          <div class="col">
            <q-input v-model="draftLesson.title" outlined dense />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Subtitle</div>
          <div class="col">
            <q-input v-model="draftLesson.subtitle" outlined dense />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Categories</div>
          <div class="col">
            <q-select
              v-model="draftLesson.categories"
              :options="availableCats"
              multiple
              emit-value
              clearable
              outlined
              options-dense
              dense
            />
          </div>
        </div>
      </q-card-section>

      <q-separator v-if="!editMode" />

      <q-card-section v-if="!editMode">
        <div class="text-center">
          <q-btn
            :to="{ name: 'lessonEditor', params: { id: lesson.id } }"
            label="Edit Lesson Content"
            icon="edit"
            color="secondary"
            no-caps
          />
        </div>
      </q-card-section>

      <q-separator v-if="!editMode" />

      <q-card-section v-if="!editMode">
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Lesson ID</div>
          <div class="col">{{ lesson.id }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Version</div>
          <div class="col">{{ lesson.version }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Created</div>
          <div class="col">
            {{ displayDateTime(lesson.createdAt, 'unsaved') }}
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Last updated</div>
          <div class="col">
            {{ displayDateTime(lesson.updatedAt, 'unsaved') }}
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Published</div>
          <div class="col">
            {{ displayDateTime(lesson.publishedAt, 'unpublished') }}
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Archived</div>
          <div class="col">
            {{ displayDateTime(lesson.archivedAt, 'not archived') }}
          </div>
        </div>
      </q-card-section>

      <q-separator v-if="!editMode" />

      <q-card-actions v-if="!editMode" align="center">
        <q-btn
          :disable="!canPublish"
          @click="() => builder.publishLesson(lesson.id)"
          color="primary"
          dense
          no-caps
          >Publish</q-btn
        >
        <q-btn
          :disable="!canRevise"
          @click="() => builder.reviseLesson(lesson.id)"
          color="primary"
          dense
          no-caps
          >Revise</q-btn
        >
        <q-btn
          :disable="!canRetract"
          @click="() => builder.retractLesson(lesson.id)"
          color="accent"
          dense
          no-caps
          >Retract</q-btn
        >
        <q-btn
          :disable="!canArchive"
          @click="() => builder.archiveLesson(lesson.id)"
          color="accent"
          dense
          no-caps
          >Archive</q-btn
        >
        <q-btn
          :disable="!canRevive"
          @click="() => builder.reviveLesson(lesson.id)"
          color="primary"
          dense
          no-caps
          >Revive</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { displayDateTime } from 'components/displayTools.js'
import { useCourseBuilderStore } from 'stores/course-builder.js'

const props = defineProps({
  lesson: {
    type: Object,
    required: true,
  },
})

const builder = useCourseBuilderStore()
const draftLesson = ref(null)
const editMode = ref(false)
const displayCategories = computed(() => {
  return props.lesson.categories ? props.lesson.categories.join(', ') : ''
})

const availableCats = [
  { label: 'engineering', value: 'engineering' },
  { label: 'fun', value: 'fun' },
  { label: 'nuclear power plants', value: 'nuclear_power_plants' },
  { label: 'perspective', value: 'perspective' },
  { label: 'safety', value: 'safety' },
  { label: 'science', value: 'science' },
]

// lesson state - probably belongs in store
const canPublish = computed(() => {
  return !props.lesson.publishedAt && !props.lesson.archivedAt
})
const canRetract = computed(() => {
  return !canPublish.value && !props.lesson.archivedAt
})
const canRevise = computed(() => {
  return !canPublish.value && !props.lesson.archivedAt
})
const canArchive = computed(() => {
  return !props.lesson.archivedAt
})
const canRevive = computed(() => {
  return props.lesson.archivedAt
})

function onEdit() {
  console.log('LessonPlanDetails.onEdit')
  draftLesson.value = { ...props.lesson }
  draftLesson.value.categories = props.lesson.categories
    ? [...props.lesson.categories]
    : []
  editMode.value = true
}
async function onSave() {
  console.log('LessonPlanDetails.onSave')
  console.log('draft lesson => ' + JSON.stringify(draftLesson.value))
  if (!draftLesson.value) {
    console.error('tried to save before loading')
    return
  }
  await builder.updateLesson(draftLesson.value)
  editMode.value = false
}
function onCancelEdit() {
  editMode.value = false
}
</script>

<style lang="scss" scoped></style>
