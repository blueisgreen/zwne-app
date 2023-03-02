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
        @click="editor.chain().focus().toggleUnderline().run()"
        :disabled="!editor.can().chain().focus().toggleUnderline().run()"
        icon="format_underlined"
        v-bind="getButtonStyle('underline')"
      />
      <q-btn
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        icon="code"
        v-bind="getButtonStyle('code')"
      />
      <q-btn
        @click="editor.chain().focus().unsetAllMarks().run()"
        icon="format_clear"
        v-bind="getAvailableButtonStyle()"
      />
      <q-separator vertical spaced />
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
      <q-btn
        @click="editor.chain().focus().toggleBlockquote().run()"
        icon="format_quote"
        v-bind="getButtonStyle('blockquote')"
      />
      <q-btn
        @click="editor.chain().focus().setHardBreak().run()"
        v-bind="getAvailableButtonStyle()"
        label="BR"
      />
      <q-btn
        @click="editor.chain().focus().setHorizontalRule().run()"
        icon="horizontal_rule"
        v-bind="getAvailableButtonStyle()"
      />

      <q-separator vertical spaced />

      <q-btn
        @click="editor.chain().focus().setParagraph().run()"
        no-caps
        v-bind="getButtonStyle('paragraph')"
        label="P"
      />
      <q-btn
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        v-bind="getButtonStyle('heading', { level: 1 })"
        label="h1"
      />
      <q-btn
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        v-bind="getButtonStyle('heading', { level: 2 })"
        label="h2"
      />
      <q-btn
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        v-bind="getButtonStyle('heading', { level: 3 })"
        label="h3"
      />
      <q-btn
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        v-bind="getButtonStyle('heading', { level: 4 })"
        label="h4"
      />
      <q-btn
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        v-bind="getButtonStyle('heading', { level: 5 })"
        label="h5"
      />
      <q-btn
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        v-bind="getButtonStyle('heading', { level: 6 })"
        label="h6"
      />

      <q-separator vertical spaced />

      <q-btn icon="link" v-bind="getAvailableButtonStyle()" />
      <q-btn icon="image" v-bind="getAvailableButtonStyle()" />
      <q-btn icon="fa-brands fa-youtube" v-bind="getAvailableButtonStyle()" />

      <q-separator vertical spaced />
      <q-space />

      <q-btn
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
        icon="undo"
        v-bind="getButtonStyle('undo')"
      />
      <q-btn
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        icon="redo"
        v-bind="getButtonStyle('redo')"
      />
      <q-btn
        @click="handleSave"
        icon="save"
        v-bind="getAvailableButtonStyle()"
      />
    </q-toolbar>
    <div class="frame">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

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

  emits: ['update:modelValue', 'save'],

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
    getButtonStyle(name, options) {
      const isActive = this.editor.isActive(name, options)
      return {
        color: isActive ? this.color.hilite : this.color.base,
        textColor: isActive ? this.color.txtHilite : this.color.txtBase,
        size: 'sm',
        dense: true,
      }
    },
    getAvailableButtonStyle() {
      return {
        color: this.color.base,
        textColor: this.color.txtBase,
        size: 'sm',
        dense: true,
      }
    },
    handleSave() {
      this.$emit('save')
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
      extensions: [
        StarterKit,
        Underline,
        Superscript,
        Subscript,
        TextAlign,
        Image,
        Link,
        FontFamily,
      ],
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
