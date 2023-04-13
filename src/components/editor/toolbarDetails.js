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
  {
    label: 'Roboto Slab',
    value: 'Roboto Slab, Georgia, serif',
  },
  // {
  //   label: 'sans-serif',
  //   value: 'sans-serif',
  // },
  {
    label: 'Poppins',
    value: 'Poppins, Verdana, sans-serif',
  },
  {
    label: 'Verdana',
    value: 'Verdana, Geneva, Tahoma, sans-serif',
  },
  // {
  //   label: 'monospace',
  //   value: 'monospace',
  // },
  {
    label: 'Courier Prime',
    value: 'Courier Prime, Courier New, monospace',
  },
  // {
  //   label: 'cursive',
  //   value: 'cursive',
  // },
  {
    label: 'Berkshire Swash',
    value: 'Berkshire Swash, cursive',
  },
  {
    label: 'Righteous',
    value: 'Righteous, cursive',
  },
  {
    label: 'Handlee',
    value: 'Handlee, cursive',
  },
  {
    label: 'Kaushan Script',
    value: 'Kaushan Script, cursive',
  },
  {
    label: 'Tilt Prism',
    value: 'Tilt Prism, cursive',
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
