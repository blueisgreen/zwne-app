<template>
  <div v-if="editor">
    <q-toolbar class="toolbar-style">
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
        @click="editor.chain().focus().toggleSubscript().run()"
        icon="subscript"
        v-bind="getButtonStyle('subscript')"
      />
      <q-btn
        @click="editor.chain().focus().toggleSuperscript().run()"
        icon="superscript"
        v-bind="getButtonStyle('superscript')"
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
        v-bind="availableButtonStyle"
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
        v-bind="availableButtonStyle"
        label="BR"
      />
      <q-btn
        @click="editor.chain().focus().setHorizontalRule().run()"
        icon="horizontal_rule"
        v-bind="availableButtonStyle"
      />

      <q-separator vertical spaced />

      <q-btn
        @click="editor.chain().focus().setParagraph().run()"
        v-bind="getButtonStyle('paragraph')"
        label="p"
      />
      <q-btn-dropdown label="H1-6" v-bind="availableButtonStyle" no-caps>
        <q-list>
          <q-item
            v-for="heading in headings"
            :key="heading.level"
            clickable
            dense
            :active="editor.isActive('heading', { level: heading.level })"
            v-close-popup
            @click="
              () => editor.chain().focus().toggleHeading({ level: heading.level }).run()
            "
          >
            <q-item-section>
              <q-item-label :class="'text-h' + heading.level">{{
                heading.label
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn-dropdown label="Align" v-bind="availableButtonStyle" no-caps>
        <q-list>
          <q-item
            v-for="alignment in alignments"
            :key="alignment.value"
            clickable
            dense
            :active="editor.isActive({ textAlign: alignment.value })"
            v-close-popup
            @click="() => editor.chain().focus().setTextAlign(alignment.value).run()"
          >
            <q-item-section>
              <q-item-label>
                <q-icon :name="alignment.icon" />
                {{ alignment.label }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn-dropdown label="Font" v-bind="availableButtonStyle" no-caps>
        <q-list>
          <q-item
            v-for="font in fonts"
            :key="font.value"
            clickable
            dense
            :active="editor.isActive('textStyle', { fontFamily: font.value })"
            v-close-popup
            @click="() => onFontFamilySelect(font.value)"
          >
            <q-item-section>
              <q-item-label :style="{ fontFamily: font.value }">{{
                font.label
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-separator vertical spaced />

      <q-btn @click="openLinkDialog" icon="link" v-bind="getButtonStyle('link')" />
      <q-btn @click="openImageDialog" icon="image" v-bind="availableButtonStyle" />
      <q-btn
        @click="handleYouTubeClick"
        icon="fa-brands fa-youtube"
        v-bind="availableButtonStyle"
      />

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
      <q-btn @click="handleSave" icon="save" v-bind="availableButtonStyle" />
    </q-toolbar>
  </div>

  <div class="frame">
    <editor-content :editor="editor" />
  </div>

  <q-dialog v-model="linkDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Link Details</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          type="url"
          v-model="linkInput.href"
          label="URL"
          autofocus
          @keyup.enter="prompt = false"
        />
        <q-input
          dense
          v-model="linkInput.target"
          label="target"
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" no-caps v-close-popup />
        <q-btn flat label="Update Link" no-caps @click="updateLink()" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="imageDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Image Details</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          type="url"
          v-model="imageInput.src"
          label="URL"
          autofocus
          @keyup.enter="prompt = false"
        />
        <q-input
          dense
          v-model="imageInput.alt"
          label="Alt text"
          @keyup.enter="prompt = false"
        />
        <q-input
          dense
          v-model="imageInput.title"
          label="Title"
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" no-caps v-close-popup />
        <q-btn flat label="Update Image" no-caps @click="updateImage()" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="youTubeDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">YouTube is not supported</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        Someday when we have some videos to share, we will add YouTube support. For now,
        it's on the long list of nice-to-haves.
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import {
  color,
  fonts,
  availableButtonStyle,
  headings,
  alignments,
} from './toolbarDetails'

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
      color,
      fonts,
      headings,
      alignments,
      availableButtonStyle,
      linkDialog: false,
      linkInput: {},
      imageDialog: false,
      imageInput: {},
      youTubeDialog: false,
    }
  },

  methods: {
    getDefaultLinkProps() {
      return {
        href: 'https://',
        target: '_blank',
      }
    },
    getDefaultImageProps() {
      return {
        src: 'https://cdn.zanzisworld.com/',
        alt: '',
        title: '',
      }
    },
    getButtonStyle(name, options) {
      const isActive = this.editor.isActive(name, options)
      return {
        color: isActive ? this.color.hilite : this.color.base,
        textColor: isActive ? this.color.txtHilite : this.color.txtBase,
        size: 'sm',
        dense: true,
      }
    },
    onFontFamilySelect(fontValue) {
      this.editor.chain().focus().setFontFamily(fontValue).run()
    },
    openLinkDialog() {
      this.linkInput = this.getDefaultLinkProps()
      const previousUrl = this.editor.getAttributes('link').href
      if (previousUrl) {
        this.linkInput.href = previousUrl
      }
      this.linkDialog = true
    },
    updateLink() {
      if (this.linkInput.href === '') {
        this.editor.chain().focus().extendMarkRange('link').unsetLink().run()
        return
      }
      this.editor.chain().focus().extendMarkRange('link').setLink(this.linkInput).run()
    },
    openImageDialog() {
      this.imageInput = this.getDefaultImageProps()
      this.imageDialog = true
    },
    updateImage() {
      this.editor.chain().focus().setImage(this.imageInput).run()
    },
    handleYouTubeClick() {
      this.youTubeDialog = true
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
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Link.configure({
          openOnClick: false,
        }),
        Image,
        TextStyle,
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
.toolbar-style {
  border: 1px solid $grey-4;
  border-bottom: none;
  background-color: $grey-2;

  button {
    margin-right: 0.5em;
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
