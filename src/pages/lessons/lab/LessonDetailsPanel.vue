<template>
  <div v-if="!lesson">
    <div class="text-h3">Choose a lesson plan to inspect</div>
  </div>
  <div v-else>
    <q-card bordered>
      <q-card-section>
        <q-toolbar>
          <q-toolbar-title>Lesson Information</q-toolbar-title>
          <span v-if="!editMode"
            ><q-btn
              @click="editDraft"
              label="Edit"
              dense
              no-caps
              icon="edit"
              color="secondary"
          /></span>
          <span v-if="editMode">
            <q-btn label="Save" color="primary" @click="saveDraft" />
            <q-btn
              label="Cancel"
              @click="cancelEdit"
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
          <div class="col-3 text-secondary">Synopsis</div>
          <div class="col">{{ lesson.synposis }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Objective</div>
          <div class="col">{{ lesson.objective }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Cover Art</div>
          <div class="col">{{ lesson.cover }}</div>
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
          <div class="col-3 text-secondary">Synopsis</div>
          <div class="col">
            <q-input v-model="draftLesson.synposis" outlined dense />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Objective</div>
          <div class="col">
            <q-input v-model="draftLesson.objective" outlined dense />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Cover Art</div>
          <div class="col">
            <q-input v-model="draftLesson.cover" outlined dense />
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
          <div class="col-3 text-secondary">Status</div>
          <div class="col">{{ lesson.status }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Last updated</div>
          <div class="col">
            {{ displayDateTime(lesson.updatedAt, 'unsaved') }}
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Created</div>
          <div class="col">
            {{ displayDateTime(lesson.createdAt, 'unsaved') }}
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
          @click="() => lab.publishLesson(lesson.id)"
          color="primary"
          dense
          no-caps
          label="Publish"
        />
        <q-btn
          :disable="!canRetract"
          @click="() => lab.retractLesson(lesson.id)"
          color="accent"
          dense
          no-caps
          label="Retract"
        />
        <q-btn
          :disable="!canArchive"
          @click="() => lab.archiveLesson(lesson.id)"
          color="accent"
          dense
          no-caps
          label="Archive"
        />
        <q-btn
          :disable="!canRevive"
          @click="() => lab.reviveLesson(lesson.id)"
          color="primary"
          dense
          no-caps
          label="Revive"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { displayDateTime } from 'components/displayTools.js'
import { useLessonLabStore } from 'stores/lesson-lab.js'
import { LessonStatus } from 'src/models'

const props = defineProps({
  lesson: {
    type: Object,
    required: true,
  },
})

const lab = useLessonLabStore()
const draftLesson = ref(null)
const editMode = ref(false)

// lesson state - probably belongs in store
const canPublish = computed(() => {
  return props.lesson.status === LessonStatus.DRAFT
})
const canRetract = computed(() => {
  return props.lesson.status === LessonStatus.PUBLISHED
})
const canArchive = computed(() => {
  return props.lesson.status !== LessonStatus.ARCHIVED
})
const canRevive = computed(() => {
  return props.lesson.status === LessonStatus.ARCHIVED
})

function editDraft() {
  draftLesson.value = { ...props.lesson }
  editMode.value = true
}
async function saveDraft() {
  console.log('draft lesson', draftLesson.value)
  if (!draftLesson.value) {
    console.warn('cannot save without a draft')
    return
  }
  await lab.saveLesson(draftLesson.value)
  editMode.value = false
}
function cancelEdit() {
  editMode.value = false
}
</script>

<style lang="scss" scoped></style>
