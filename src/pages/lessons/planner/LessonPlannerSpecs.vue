<template>
  <q-btn label="Specs" color="info" text-color="grey-9" @click="specs = true" />
  <q-dialog v-model="specs">
    <q-card>
      <q-card-section>
        <div class="text-h6">Specs</div>
        <ul>
          <li>See editable lessons</li>
          <li>Create new lesson</li>
          <li>Edit a draft lesson</li>
          <li>Start a revision on any published lesson</li>
          <li>Apply metadata: catagories, etc.</li>
          <li>Change lesson status</li>
          <li>Set up lesson groups and paths (i.e., courses)</li>
          <li>View usage stats</li>
        </ul>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

const specs = ref(false)
</script>

<style lang="scss" scoped></style>
