<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="lesson-card" v-for="lesson in lessons" :key="lesson.id">
      <q-img
        :src="`https://cdn.zanzisworld.com/images/${
          lesson.cover || 'cherenkov-radiation-1280x720.png'
        }`"
      />
      <q-card-section>
        <div class="text-h6">{{ lesson.title }}</div>
        <div class="text-subtitle2">{{ lesson.subtitle }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ lesson.synopsis }}
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          :to="{ name: 'lessonViewer', params: { id: lesson.id } }"
          flat
          color="primary"
          >Start</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
const props = defineProps({
  itemLimit: {
    type: Number,
    default: 4,
  },
  lessons: {
    type: Array,
    default: () => {
      return []
    },
  },
})
</script>

<style lang="scss" scoped>
.lesson-card {
  width: 100%;
  max-width: 350px;
}
</style>
