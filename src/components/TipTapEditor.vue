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
      />
      <q-btn
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :color="getButtonColor('italic')"
        :text-color="getTextColor('italic')"
        icon="format_italic"
        dense
        size="sm"
      />
      <q-btn
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :color="getButtonColor('strike')"
        :text-color="getTextColor('strike')"
        icon="strikethrough_s"
        dense
        size="sm"
      />
      <q-btn
        @click="editor.chain().focus().toggleBulletList().run()"
        :color="getButtonColor('bulletList')"
        :text-color="getTextColor('bulletList')"
        icon="format_list_bulleted"
        dense
        size="sm"
      />
      <q-btn
        @click="editor.chain().focus().toggleOrderedList().run()"
        :color="getButtonColor('orderedList')"
        :text-color="getTextColor('orderedList')"
        icon="format_list_numbered"
        dense
        size="sm"
      />
    </q-toolbar>
    <editor-content :editor="editor" />
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
      const isSame = this.editor.getHTML() === value

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
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
    padding: 0.5em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
</style>
