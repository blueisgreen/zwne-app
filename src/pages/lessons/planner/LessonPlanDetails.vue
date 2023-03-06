<template>
  <div v-if="!planner.selectedLesson">
    <div class="text-h3">Choose a plan to inspect</div>
  </div>
  <div v-if="!!planner.selectedLesson">
    <q-card bordered>
      <q-card-section>
        <q-toolbar>
          <q-toolbar-title>Lesson Details</q-toolbar-title>
          <span v-if="!editOn"
            ><q-btn @click="editDetails" label="Edit" no-caps
          /></span>
          <span v-if="editOn">
            <q-btn label="Save" color="primary" @click="handleSave" />
            <q-btn
              label="Cancel"
              @click="handleCancel"
              color="primary"
              flat
              class="q-ml-sm"
          /></span>
        </q-toolbar>
      </q-card-section>
      <q-card-section v-if="!editOn">
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Title</div>
          <div class="col">{{ planner.selectedLesson.title }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Subtitle</div>
          <div class="col">{{ planner.selectedLesson.subtitle }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Version</div>
          <div class="col">{{ planner.selectedLesson.version }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Category</div>
          <div class="col">{{ cats }}</div>
        </div>
      </q-card-section>
      <q-card-section v-if="editOn">
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Title</div>
          <div class="col">
            <q-input
              v-model="planner.selectedPlanChanges.title"
              outlined
              dense
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Subtitle</div>
          <div class="col">
            <q-input
              v-model="planner.selectedPlanChanges.subtitle"
              outlined
              dense
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Version</div>
          <div class="col">
            <q-input
              v-model="planner.selectedPlanChanges.version"
              outlined
              dense
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Categories</div>
          <div class="col">
            <q-select
              v-model="planner.selectedPlanChanges.categories"
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

      <q-card-actions align="around">
        <q-btn
          :disable="!canPublish"
          @click="planner.publishSelectedLesson"
          color="primary"
          dense
          no-caps
          >Publish</q-btn
        >
        <q-btn
          :disable="!canRevise"
          @click="planner.revisePublishedSelectedLesson"
          color="primary"
          dense
          no-caps
          >Revise</q-btn
        >
        <q-btn
          :disable="!canRetract"
          @click="planner.retractPublishedSelectedLesson"
          color="primary"
          dense
          no-caps
          >Retract</q-btn
        >
        <q-btn
          :disable="!canArchive"
          @click="planner.archiveSelectedLesson"
          color="primary"
          dense
          no-caps
          >Archive</q-btn
        >
        <q-btn
          :disable="!canRevive"
          @click="planner.reviveSelectedLesson"
          color="primary"
          dense
          no-caps
          >Revive</q-btn
        >
      </q-card-actions>

      <q-separator />

      <q-card-section>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Lesson ID</div>
          <div class="col">{{ planner.selectedLesson.id }}</div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Created</div>
          <div class="col">
            {{ simpleDateTime(planner.selectedLesson.createdAt, 'unsaved') }}
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Last updated</div>
          <div class="col">
            {{ simpleDateTime(planner.selectedLesson.updatedAt, 'unsaved') }}
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Published</div>
          <div class="col">
            {{
              simpleDateTime(planner.selectedLesson.publishedAt, 'unpublished')
            }}
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-3 text-secondary">Archived</div>
          <div class="col">
            {{
              simpleDateTime(planner.selectedLesson.archivedAt, 'not archived')
            }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { date } from 'quasar'
import { useLessonPlannerStore } from 'stores/lesson-planner-store.js'

const planner = useLessonPlannerStore()
const availableCats = [
  { label: 'engineering', value: 'engineering' },
  { label: 'fun', value: 'fun' },
  { label: 'nuclear power plants', value: 'nuclear_power_plants' },
  { label: 'perspective', value: 'perspective' },
  { label: 'safety', value: 'safety' },
  { label: 'science', value: 'science' },
]
const cats = computed(() => {
  return planner.selectedLesson.categories.join(', ')
})
const editOn = computed(() => {
  return planner.selectedPlanChanges != null
})

// lesson state
const canPublish = computed(() => {
  return (
    !planner.selectedLesson.publishedAt && !planner.selectedLesson.archivedAt
  )
})
const canRetract = computed(() => {
  return !canPublish.value && !planner.selectedLesson.archivedAt
})
const canRevise = computed(() => {
  return !canPublish.value && !planner.selectedLesson.archivedAt
})
const canArchive = computed(() => {
  return !planner.selectedLesson.archivedAt
})
const canRevive = computed(() => {
  return planner.selectedLesson.archivedAt
})

function simpleDateTime(ts, nullLabel = '') {
  return ts ? date.formatDate(ts, 'YYYY-MMM-D H:mm:ss ZZ') : nullLabel
}
function editDetails() {
  planner.editSelectedDetails()
}
function handleSave() {
  console.log('saving plan details')
  planner.savePlanChanges()
}
function handleCancel() {
  planner.clearPlanEdits()
}
</script>

<style lang="scss" scoped></style>
