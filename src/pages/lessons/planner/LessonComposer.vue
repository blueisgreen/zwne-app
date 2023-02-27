<template>
  <div class="q-pa-md">
    <q-btn
      label="Save"
      color="primary"
      :disable="!lesson.isDraftDirty"
      @click="lesson.saveContentChanges"
    />
    <q-editor
      v-model="lesson.activeContentDraft"
      max-height="400px"
      toolbar-rounded
      toolbar-push
      toolbar-bg="light-blue-2"
      placeholder="Enlightenment goes here..."
      :definitions="{
        save: {
          tip: 'Save your work',
          icon: 'save',
          label: 'Save',
          handler: saveWork,
          disable: !lesson.isDraftDirty,
        },
        image: {
          tip: 'Insert an image link',
          icon: 'image',
          handler: addImage,
        },
        subscript: {
          icon: 'subscript',
        },
        superscript: {
          icon: 'superscript',
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        [
          {
            label: $q.lang.editor.defaultFont,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'lucida_grande',
              'times_new_roman',
              'verdana',
            ],
          },
          {
            icon: 'text_format',
            list: 'no-icons',
            options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
          },
          {
            icon: 'format_size',
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7',
            ],
          },
          'removeFormat',
        ],
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify'],
          },
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['hr', 'link', 'image'],
        ['undo', 'redo', 'save'],
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana',
      }"
    />
  </div>
</template>

<script setup>
import { useLessonPlannerStore } from 'stores/lesson-planner-store.js'
import { useQuasar } from 'quasar'

const lesson = useLessonPlannerStore()
const $q = useQuasar()

function addImage() {
  alert('Not implemented')
}
function saveWork() {
  lesson.saveContentChanges()
}
function autoSave() {
  if (lesson.isDraftDirty) {
    saveWork()
  }
}
</script>

<style lang="scss" scoped></style>
