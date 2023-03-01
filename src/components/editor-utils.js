import { QBtn } from 'quasar'

export function getLinkEditor(eVm) {
  if (eVm.caret) {
    const color = eVm.props.toolbarColor || eVm.props.toolbarTextColor
    let link = eVm.editLinkUrl.value
    const updateLink = () => {
      eVm.caret.restore()

      if (link !== eVm.editLinkUrl.value) {
        document.execCommand('createLink', false, link === '' ? ' ' : link)
      }

      eVm.editLinkUrl.value = null
    }

    return [
      h(
        'div',
        { class: `q-mx-xs text-${color}` },
        `${eVm.$q.lang.editor.url}: `
      ),
      h('input', {
        key: 'qedt_btm_input',
        class: 'col q-editor__link-input',
        value: link,
        onInput: (evt) => {
          stop(evt)
          link = evt.target.value
        },
        onKeydown: (evt) => {
          if (shouldIgnoreKey(evt) === true) {
            return
          }

          switch (evt.keyCode) {
            case 13: // ENTER key
              prevent(evt)
              return updateLink()
            case 27: // ESCAPE key
              prevent(evt)
              eVm.caret.restore()
              if (
                !eVm.editLinkUrl.value ||
                eVm.editLinkUrl.value === 'https://'
              ) {
                document.execCommand('unlink')
              }
              eVm.editLinkUrl.value = null
              break
          }
        },
      }),
      getGroup([
        h(QBtn, {
          key: 'qedt_btm_rem',
          tabindex: -1,
          ...eVm.buttonProps.value,
          label: eVm.$q.lang.label.remove,
          noCaps: true,
          onClick: () => {
            eVm.caret.restore()
            document.execCommand('unlink')
            eVm.editLinkUrl.value = null
          },
        }),
        h(QBtn, {
          key: 'qedt_btm_upd',
          ...eVm.buttonProps.value,
          label: eVm.$q.lang.label.update,
          noCaps: true,
          onClick: updateLink,
        }),
      ]),
    ]
  }
}
