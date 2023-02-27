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
          handler: handleSave,
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

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'CompositionEditor',
  props: {
    startingText: {
      type: String,
      default: '',
    },
    maxHeight: {
      type: String,
      default: '250px',
    },
    bareBones: Boolean, // alignment, bold, italic, save
    fontOptions: Boolean, // variety of fonts, text sizes
    mathSymbols: Boolean, // TODO: support for equations
  },
  emits: ['saveWork'],
  setup() {
    return {
      toolbarItems: ref({}),
      composition: ref(''),
    }
  },
  created() {
    const $q = useQuasar()
    if (this.startingText) {
      this.composition = this.startingText
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

    if (this.bareBones) {
      this.toolbarItems = [['bold', 'italic']]
    } else {
      this.toolbarItems = [
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
      ]
    }
    if (this.fontOptions) {
      this.toolbarItems.push(fontItems)
    }
    if (this.mathSymbols) {
      console.log('Sorry, not implemented')
    }
    if (this.bareBones) {
      this.toolbarItems.push([alignmentItems], ['undo', 'redo'], ['save'])
    } else {
      this.toolbarItems.push(
        [alignmentItems, 'quote', 'unordered', 'ordered', 'link'],
        ['undo', 'redo'],
        ['save']
      )
    }
  },
  methods: {
    handleSave() {
      this.$emit('saveWork', this.composition)
    },
  },
})
</script>

<style lang="scss" scoped></style>
