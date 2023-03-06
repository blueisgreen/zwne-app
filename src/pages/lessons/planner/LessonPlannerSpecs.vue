<template>
  <q-btn label="Specs" color="info" text-color="grey-9" @click="specs = true" />
  <q-dialog v-model="specs">
    <q-card>
      <q-card-section>
        <div class="text-h6">Specs</div>
        <ul>
          <li><q-icon name="check" /> See editable lessons</li>
          <li><q-icon name="check" /> Create new lesson</li>
          <li><q-icon name="check" /> Edit a draft lesson</li>
          <li>
            <q-icon name="check" /> Change lesson status: publish, unpublish,
            archive
          </li>
          <li>
            <q-icon name="check" /> Start a revision on any published lesson
          </li>
          <li><q-icon name="check" /> Apply metadata: catagories, etc.</li>
          <li><q-icon name="check" /> View usage stats</li>
          <li>Set up lesson groups and paths (i.e., courses)</li>
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
