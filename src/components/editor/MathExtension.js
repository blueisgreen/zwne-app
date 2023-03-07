/**
 * picked up at: https://codesandbox.io/s/04o0s?file=/src/components/Extension.js:224-239
 *
 * other interesting sources:
 *  https://katex.org/
 *
 */
// import { Node } from '@tiptap/core'
// import {
//   makeInlineMathInputRule,
//   REGEX_INLINE_MATH_DOLLARS,
// } from '@benrbray/prosemirror-math'
// import { mathPlugin } from '@benrbray/prosemirror-math'
// import mergeAttributes from '@tiptap/core'

// export default Node.create({
//   name: 'math_inline',
//   group: 'inline math',
//   content: 'text*', // important!
//   inline: true, // important!
//   atom: true, // important!

//   parseHTML() {
//     return [
//       {
//         tag: 'math-inline', // important!
//       },
//     ]
//   },

//   renderHTML({ HTMLAttributes }) {
//     return [
//       'math-inline',
//       mergeAttributes({ class: 'math-node' }, HTMLAttributes),
//       0,
//     ]
//   },

//   addProseMirrorPlugins() {
//     return [mathPlugin]
//   },

//   addInputRules() {
//     return [makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS, this.type)]
//   },
// })
