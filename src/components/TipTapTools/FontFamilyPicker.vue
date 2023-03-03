<template>
  <q-btn
    @click="editor.chain().focus().setFontFamily('serif').run()"
    v-bind="getButtonStyle('textStyle', { fontFamily: 'serif' })"
    label="serif"
    no-caps
  />
  <q-btn
    @click="editor.chain().focus().setFontFamily('Georgia, serif').run()"
    v-bind="getButtonStyle('textStyle', { fontFamily: 'Georgia, serif' })"
    label="Georgia"
    no-caps
  />
  <q-btn
    @click="editor.chain().focus().setFontFamily('sans-serif').run()"
    v-bind="getButtonStyle('textStyle', { fontFamily: 'sans-serif' })"
    label="sans-serif"
    no-caps
  />
  <q-btn
    @click="editor.chain().focus().setFontFamily('Optima, sans-serif').run()"
    v-bind="getButtonStyle('textStyle', { fontFamily: 'Optima, sans-serif' })"
    label="Optima"
    no-caps
  />
  <q-btn
    @click="editor.chain().focus().setFontFamily('Verdana, sans-serif').run()"
    v-bind="getButtonStyle('textStyle', { fontFamily: 'Verdana, sans-serif' })"
    label="Verdana"
    no-caps
  />
  <q-btn
    @click="editor.chain().focus().setFontFamily('monospace').run()"
    v-bind="getButtonStyle('textStyle', { fontFamily: 'monospace' })"
    label="monospace"
    no-caps
  />
  <q-btn
    @click="
      editor.chain().focus().setFontFamily('Courier New, monospace').run()
    "
    v-bind="
      getButtonStyle('textStyle', {
        fontFamily: 'Courier New, monospace',
      })
    "
    label="Courier New"
    no-caps
  />
  <q-btn
    @click="editor.chain().focus().setFontFamily('cursive').run()"
    v-bind="getButtonStyle('textStyle', { fontFamily: 'cursive' })"
    label="cursive"
    no-caps
  />
  <q-btn
    @click="editor.chain().focus().setFontFamily('Bradley Hand, cursive').run()"
    v-bind="
      getButtonStyle('textStyle', {
        fontFamily: 'Bradley Hand, cursive',
      })
    "
    label="Bradley Hand"
    no-caps
  />
  <q-btn
    @click="editor.chain().focus().setFontFamily('fantasy').run()"
    v-bind="getButtonStyle('textStyle', { fontFamily: 'fantasy' })"
    label="fantasy"
    no-caps
  />
  <q-btn
    @click="editor.chain().focus().setFontFamily('Luminari, fantasy').run()"
    v-bind="getButtonStyle('textStyle', { fontFamily: 'Luminari, fantasy' })"
    label="Luminari"
    no-caps
  />
  <q-btn
    @click="editor.chain().focus().unsetFontFamily().run()"
    label="remove font family"
    v-bind="getAvailableButtonStyle()"
    no-caps
  />
</template>

<script setup>
// import styleHelpers from './toolbarStyleHelpers'

const props = defineProps({
  editor: Object,
})
function getButtonStyle(name, options) {
  const isActive = this.editor.isActive(name, options)
  return {
    color: isActive ? this.color.hilite : this.color.base,
    textColor: isActive ? this.color.txtHilite : this.color.txtBase,
    size: 'sm',
    dense: true,
  }
}

function getAvailableButtonStyle() {
  return {
    color: this.color.base,
    textColor: this.color.txtBase,
    size: 'sm',
    dense: true,
  }
}
// const { getButtonStyle, getAvailableButtonStyle } = styleHelpers(editor)
</script>

<style lang="scss" scoped></style>
