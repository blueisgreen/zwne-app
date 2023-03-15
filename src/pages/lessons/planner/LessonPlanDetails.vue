<template>
  <div v-if="!lessonToEdit">
    <div class="text-h3">Choose a plan to inspect</div>
  </div>
  <div v-if="!!lessonToEdit">
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
          <div class="col">{{ lessonToEdit.title }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Subtitle</div>
          <div class="col">{{ lessonToEdit.subtitle }}</div>
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
            <q-input v-model="lessonToEdit.title" outlined dense />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Subtitle</div>
          <div class="col">
            <q-input v-model="lessonToEdit.subtitle" outlined dense />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Categories</div>
          <div class="col">
            <q-select
              v-model="lessonToEdit.categories"
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
            :to="{ name: 'lessonEditor', params: { id: lessonId } }"
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
          <div class="col">{{ lessonToEdit.id }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Version</div>
          <div class="col">{{ lessonToEdit.version }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Created</div>
          <div class="col">
            {{ displayDateTime(lessonToEdit.createdAt, 'unsaved') }}
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Last updated</div>
          <div class="col">
            {{ displayDateTime(lessonToEdit.updatedAt, 'unsaved') }}
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Published</div>
          <div class="col">
            {{ displayDateTime(lessonToEdit.publishedAt, 'unpublished') }}
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Archived</div>
          <div class="col">
            {{ displayDateTime(lessonToEdit.archivedAt, 'not archived') }}
          </div>
        </div>
      </q-card-section>

      <q-separator v-if="!editMode" />

      <q-card-actions v-if="!editMode" align="center">
        <q-btn
          :disable="!canPublish"
          @click="() => builder.publishLesson(lessonId)"
          color="primary"
          dense
          no-caps
          >Publish</q-btn
        >
        <q-btn
          :disable="!canRevise"
          @click="() => builder.reviseLesson(lessonId)"
          color="primary"
          dense
          no-caps
          >Revise</q-btn
        >
        <q-btn
          :disable="!canRetract"
          @click="() => builder.retractLesson(lessonId)"
          color="accent"
          dense
          no-caps
          >Retract</q-btn
        >
        <q-btn
          :disable="!canArchive"
          @click="() => builder.archiveLesson(lessonId)"
          color="accent"
          dense
          no-caps
          >Archive</q-btn
        >
        <q-btn
          :disable="!canRevive"
          @click="() => builder.reviveLesson(lessonId)"
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
  lessonId: {
    type: String,
    required: true,
  },
})

const builder = useCourseBuilderStore()
const lessonToEdit = builder.lessonPlan(props.lessonId)
const draftLesson = ref(null)
const editMode = ref(false)
const displayCategories = computed(() => {
  return lessonToEdit.categories ? lessonToEdit.categories.join(', ') : ''
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
  return !lessonToEdit.publishedAt && !lessonToEdit.archivedAt
})
const canRetract = computed(() => {
  return !canPublish.value && !lessonToEdit.archivedAt
})
const canRevise = computed(() => {
  return !canPublish.value && !lessonToEdit.archivedAt
})
const canArchive = computed(() => {
  return !lessonToEdit.archivedAt
})
const canRevive = computed(() => {
  return lessonToEdit.archivedAt
})

function onEdit() {
  draftLesson.value = { ...lessonToEdit }
  draftLesson.value.categories = lessonToEdit.categories
    ? lessonToEdit.categories.slice()
    : []
  editMode.value = true
}
function onSave() {
  if (!draftLesson.value) {
    console.error('tried to save before editing')
    return
  }
  builder.saveLessonPlan(draftLesson.value)
  editMode.value = false
}
function onCancelEdit() {
  editMode.value = false
}
</script>

<style lang="scss" scoped></style>
