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
          <div class="col-3 text-secondary">Categories</div>
          <div class="col">{{ cats }}</div>
        </div>
      </q-card-section>

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
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { date } from 'quasar'
import { useLessonPlannerStore } from 'stores/lesson-planner-store.js'

const planner = useLessonPlannerStore()
// const editOn = ref(false) // TODO: default true when new lesson - use store for flag
const cats = computed(() => {
  return planner.selectedLesson.categories.join(', ')
})
const editOn = computed(() => {
  return planner.selectedPlanChanges != null
})

function simpleDateTime(ts, nullLabel = '') {
  return ts ? date.formatDate(ts, 'YYYY-MMM-D H:mm:ss ZZ') : nullLabel
}
function editDetails() {
  planner.editSelectedDetails()
}
function handleSave() {
  planner.savePlanChanges()
}
function handleCancel() {
  planner.clearPlanEdits()
}
</script>

<style lang="scss" scoped></style>
