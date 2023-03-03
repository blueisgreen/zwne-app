export { availableButtonStyle, color, fonts }

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

const color = {
  base: 'primary',
  txtBase: 'white',
  hilite: 'blue-2',
  txtHilite: 'black',
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
