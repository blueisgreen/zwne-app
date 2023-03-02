<template>
  <div v-if="editor">
    <q-toolbar class="toolbar">
      <q-btn
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :color="getButtonColor('bold')"
        :text-color="getTextColor('bold')"
        icon="format_bold"
        dense
        size="sm"
        class="gap"
      />
      <q-btn
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :color="getButtonColor('italic')"
        :text-color="getTextColor('italic')"
        icon="format_italic"
        dense
        size="sm"
        class="gap"
      />
      <q-btn
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :color="getButtonColor('strike')"
        :text-color="getTextColor('strike')"
        icon="strikethrough_s"
        dense
        size="sm"
        class="gap"
      />
    </q-toolbar>
    <div class="frame">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null,
      color: {
        base: 'primary',
        txtBase: 'white',
        hilite: 'blue-2',
        txtHilite: 'black',
      },
    }
  },

  methods: {
    getButtonColor(name) {
      return this.editor.isActive(name) ? this.color.hilite : this.color.base
    },
    getTextColor(name) {
      return this.editor.isActive('bold')
        ? this.color.txtHilite
        : this.color.txtBase
    },
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>
<style lang="scss">
.toolbar {
  border: 5px groove burlywood;
  button {
    border: 1px solid grey;
    margin: 2px;
  }
}
.frame {
  border: 5px groove burlywood;
  padding: 1em;
}
</style>
