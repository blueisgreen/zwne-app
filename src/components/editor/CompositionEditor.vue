<template>
  <div>
    <q-editor
      v-model="composition"
      :max-height="maxHeight"
      paragraph-tag="p"
      toolbar-push
      toolbar-bg="grey-3"
      placeholder="Type whatever you like..."
      :definitions="{
        save: {
          tip: 'Save me',
          icon: 'save',
          label: 'Save',
          handler: $emit('save', composition),
        },
        subscript: {
          icon: 'subscript',
        },
        superscript: {
          icon: 'superscript',
        },
      }"
      :toolbar="toolbarItems"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana',
      }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const props = defineProps({
  startingText: {
    type: String,
    default: '',
  },
  maxHeight: {
    type: String,
    default: '400px',
  },
  bareBones: Boolean, // alignment, bold, italic, save
  fontOptions: Boolean, // variety of fonts, text sizes
  mathSymbols: Boolean, // TODO: support for equations
})

const emit = defineEmits(['save'])

const toolbarItems = ref([])
const composition = ref('')

onMounted(() => {
  const $q = useQuasar()
  alert(JSON.stringify(props))
  if (props.startingText) {
    composition.value = props.startingText
  }
  const alignmentItems = {
    label: '',
    icon: $q.iconSet.editor.align,
    fixedLabel: true,
    list: 'only-icons',
    options: ['left', 'center', 'right', 'justify'],
  }
  const fontItems = [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: ['size-1', 'size-2', 'size-3', 'size-5', 'size-6'],
    },
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'default_font',
        'arial',
        'arial_black',
        'comic_sans',
        'courier_new',
        'impact',
        'lucida_grande',
        'times_new_roman',
        'verdana',
      ],
    },
    'removeFormat',
  ]

  if (props.bareBones) {
    toolbarItems.value = [['bold', 'italic']]
  } else {
    toolbarItems.value = [
      ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
    ]
  }
  if (props.fontOptions) {
    toolbarItems.value.push(fontItems)
  }
  if (props.mathSymbols) {
    console.log('Sorry, not implemented')
  }
  if (props.bareBones) {
    toolbarItems.value.push([alignmentItems], ['undo', 'redo'], ['save'])
  } else {
    toolbarItems.value.push(
      [alignmentItems, 'quote', 'unordered', 'ordered', 'link'],
      ['undo', 'redo'],
      ['save']
    )
  }
})
</script>

<style lang="scss" scoped></style>
