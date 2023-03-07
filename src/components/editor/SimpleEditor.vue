<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="content"
      paragraph="p"
      min-height="5rem"
      placeholder="Type whatever you like..."
    />
    <q-btn label="Post" @click="handlePost" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  initialContent: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['post'])
const content = ref('')

onMounted(() => {
  content.value = props.initialContent
  alert('mounted: ' + props.initialContent)
})

function handlePost() {
  emit('post', content.value)
  content.value = ''
}
</script>

<style></style>
