<template>
  <div class="q-pa-md lessons">
    <form
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
    >
      <q-editor
        ref="lessonEditor"
        v-model="lesson.activeContentDraft"
        placeholder="Enlightenment goes here..."
        @blur="autoSave"
        toolbar-rounded
        toolbar-bg="yellow-1"
        max-height="400px"
        :definitions="{
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
            'quote',
            'unordered',
            'ordered',
            'outdent',
            'indent',
          ],
          ['hr', 'link', 'undo', 'redo', 'save'],
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
      >
        <template #save>
          <q-btn
            @click="save"
            icon="save"
            label="Save"
            flat
            dense
            size="sm"
            :loading="saving"
            :disable="!lesson.isDraftDirty"
          />
        </template>
      </q-editor>
    </form>
  </div>
</template>

<script setup>
import { useLessonPlannerStore } from 'stores/lesson-planner-store.js'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()
const lesson = useLessonPlannerStore()

const editorRef = ref(null)

const saving = ref(false)

function save() {
  saving.value = true
  setTimeout(() => {
    lesson.saveContentChanges()
    saving.value = false
  }, 2000)
}
function autoSave() {
  if (lesson.isDraftDirty) {
    save()
  }
}
</script>

<style lang="scss" scoped>
img {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 5px;
  width: 150px;
}
</style>
