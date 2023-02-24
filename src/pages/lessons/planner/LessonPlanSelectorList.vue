<template>
  <div>
    <q-toolbar class="text-primary">
      <q-toolbar-title> Choose a Lesson </q-toolbar-title>
      <q-btn
        round
        dense
        icon="add"
        color="primary"
        @click="planner.createLesson"
      />
    </q-toolbar>
    <q-scroll-area style="height: 400px">
      <q-list bordered separator>
        <q-item
          v-for="option in planner.lessonOptions"
          :key="option.id"
          clickable
          v-ripple
          @click="() => planner.selectLesson(option.id)"
        >
          <q-item-section>
            <q-item-label>{{ option.title }}</q-item-label>
            <q-item-label caption>{{ option.id }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn icon="edit" @click.stop="() => handleClickEdit(option.id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useLessonPlannerStore } from 'stores/lesson-planner-store.js'
const planner = useLessonPlannerStore()
const router = useRouter()

function handleClickEdit(id) {
  planner.selectLesson(id)
  router.push({ name: 'lesson-editor', params: { id } })
}
</script>

<style lang="scss" scoped></style>
