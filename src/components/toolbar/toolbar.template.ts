import {TButtonOption} from '@/models/TButtonOption'

/**
 * Function for create toolbar
 * @param {TButtonOption} options
 * @return {string}
 */
export function createButton({typeButton, active, value}:
  TButtonOption): string {
  const style = JSON.stringify(value)
  const meta = `
    data-type='button'
    data-value=${style}
  `
  return `
    <div class="toolbar-buttons button ${active ? 'active' : ''}" ${meta}>
      <i class="material-icons">${typeButton}</i>
    </div>
  `
}

/**
 * Function for create toolbar
 * @param {TButtonOption} buttons
 * @return {string}
 */
export function createToolbar(buttons: TButtonOption[]): string {
  return buttons.map(createButton).join('')
}
