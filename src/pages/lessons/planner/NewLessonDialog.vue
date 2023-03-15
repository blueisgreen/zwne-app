<template>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New Lesson Title</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="title" autofocus @keyup.enter="prompt = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Create Lesson" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
const prompt = ref(false)
const title = ref('')
</script>

<style lang="scss" scoped></style>
