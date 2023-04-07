<template>
  <q-card bordered>
    <q-card-section>
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
        <div class="col">{{ lesson.synopsis }}</div>
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

    <q-separator />

    <q-card-section>
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

    <q-separator />

    <q-card-actions align="center">
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
</template>

<script setup>
import { computed } from 'vue'
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

const canPublish = computed(() => {
  return (
    props.lesson.status === LessonStatus.DRAFT ||
    props.lesson.status === LessonStatus.IN_REVIEW
  )
})
const canRetract = computed(() => {
  return (
    props.lesson.status === LessonStatus.PUBLISHED ||
    props.lesson.status === LessonStatus.IN_REVIEW
  )
})
const canArchive = computed(() => {
  return props.lesson.status !== LessonStatus.ARCHIVED
})
const canRevive = computed(() => {
  return props.lesson.status === LessonStatus.ARCHIVED
})
</script>
