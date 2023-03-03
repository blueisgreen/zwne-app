// FIXME: figure out a way to do this
// const init = (editor) => {
//   return {
//     getButtonStyle: (name, options) => {
//       const isActive = editor.isActive(name, options)
//       return {
//         color: isActive ? color.hilite : color.base,
//         textColor: isActive ? color.txtHilite : color.txtBase,
//         size: 'sm',
//         dense: true,
//       }
//     },
//   }
// }

// const color = {
//   base: 'primary',
//   txtBase: 'white',
//   hilite: 'blue-2',
//   txtHilite: 'black',
// }
const color = {
  base: 'blue-2',
  txtBase: 'black',
  hilite: 'primary',
  txtHilite: 'white',
}

const availableButtonStyle = {
  color: color.base,
  textColor: color.txtBase,
  size: 'sm',
  dense: true,
}

const fonts = [
  // {
  //   label: 'serif',
  //   value: 'serif',
  // },
  {
    label: 'Georgia',
    value: 'Georgia, serif',
  },
  // {
  //   label: 'sans-serif',
  //   value: 'sans-serif',
  // },
  {
    label: 'Optima',
    value: 'Optima, sans-serif',
  },
  {
    label: 'Verdana',
    value: 'Verdana, sans-serif',
  },
  // {
  //   label: 'monospace',
  //   value: 'monospace',
  // },
  {
    label: 'Courier New',
    value: 'Courier New, monospace',
  },
  // {
  //   label: 'cursive',
  //   value: 'cursive',
  // },
  {
    label: 'Bradley Hand',
    value: 'Bradley Hand, cursive',
  },
  // {
  //   label: 'fantasy',
  //   value: 'fantasy',
  // },
  {
    label: 'Luminari',
    value: 'Luminari, fantasy',
  },
]

const headings = [
  { label: 'H1', level: 1 },
  { label: 'H2', level: 2 },
  { label: 'H3', level: 3 },
  { label: 'H4', level: 4 },
  { label: 'H5', level: 5 },
  { label: 'H6', level: 6 },
]

const alignments = [
  { label: 'left', icon: 'format_align_left', value: 'left' },
  { label: 'center', icon: 'format_align_center', value: 'center' },
  { label: 'right', icon: 'format_align_right', value: 'right' },
  { label: 'justify', icon: 'format_align_justify', value: 'justify' },
]

export { availableButtonStyle, color, fonts, headings, alignments }
