<template>
  <tip-tap />
  <tip-tap-editor v-model="content" />
  <tip-tap-example />
  <tip-tap-link-example />
  <tip-tap-image-example />
</template>

<script setup>
import TipTap from 'components/TipTap.vue'
import TipTapEditor from 'components/TipTapEditor.vue'
import TipTapExample from 'components/TipTapExample.vue'
import TipTapLinkExample from 'components/TipTapLinkExample.vue'
import TipTapImageExample from 'components/TipTapImageExample.vue'
import { ref } from 'vue'

const content = ref('Hello, Tip-Tappers.')
</script>

<style lang="scss" scoped></style>
