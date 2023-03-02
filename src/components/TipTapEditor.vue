<template>
  <div v-if="editor">
    <q-toolbar class="toolbar">
      <q-btn
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        icon="format_bold"
        v-bind="getButtonStyle('bold')"
      />
      <q-btn
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        icon="format_italic"
        v-bind="getButtonStyle('italic')"
      />
      <q-btn
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        icon="strikethrough_s"
        v-bind="getButtonStyle('strike')"
      />
      <q-btn
        @click="editor.chain().focus().toggleBulletList().run()"
        icon="format_list_bulleted"
        v-bind="getButtonStyle('bulletList')"
      />
      <q-btn
        @click="editor.chain().focus().toggleOrderedList().run()"
        icon="format_list_numbered"
        v-bind="getButtonStyle('orderedList')"
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
    getButtonStyle(name) {
      const isActive = this.editor.isActive(name)
      return {
        color: isActive ? this.color.hilite : this.color.base,
        textColor: isActive ? this.color.txtHilite : this.color.txtBase,
        size: 'sm',
        dense: true,
      }
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
  background-color: $yellow-1;
  border: 1px solid $grey-4;
  border-bottom: none;
  button {
    border: 1px solid grey;
    margin: 2px;
  }
}
.frame {
  border: 1px solid $grey-4;
  padding: 0.5em;
  max-height: 100%;
}
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
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
