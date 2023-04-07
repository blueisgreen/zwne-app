<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="lesson-card" v-for="n in itemLimit" :key="n">
      <q-img src="https://cdn.zanzisworld.com/images/atomic-structure-1280x720.png" />
      <q-card-section>
        <div class="text-h6">Atomic Habits</div>
        <div class="text-subtitle2">The things you do everyday to save the planet</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        This is the synopsis of the lesson you are being offered. By the time you read
        this, you might be ready to spend 10 minutes to learn more.
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  itemLimit: {
    type: Number,
    default: 4,
  },
  // lessons: {
  //   type: Array,
  //   required: true,
  // },
})
</script>

<style lang="scss" scoped>
.lesson-card {
  width: 100%;
  max-width: 350px;
}
</style>
