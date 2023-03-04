<template>
  <q-btn label="Specs" color="info" text-color="grey-9" @click="specs = true" />
  <q-dialog v-model="specs">
    <q-card>
      <q-card-section>
        <div class="text-h6">Specs</div>
        <ul>
          <li><q-icon name="check" /> Preview lesson content</li>
          <li>
            <q-icon name="check" /> Change lesson content in WSYIWYG editor
          </li>
          <li><q-icon name="check" /> See raw HTML</li>
          <li>
            Editor specs:
            <ul>
              <li><q-icon name="check" /> Basic formatting</li>
              <li>
                <q-icon name="check" />3 fonts styles: serif, sans-serif,
                mono-spaced
              </li>
              <li>Equation/math support</li>
              <li><q-icon name="check" />Add/Edit links</li>
              <li><q-icon name="check" />Add images</li>
              <li>Upload images</li>
              <li>Auto-save enabled</li>
            </ul>
          </li>
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
