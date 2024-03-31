import {PartialButtonStyle, TButtonStyle} from '@/models/TButtonOption'

const toolbarInitialState: TButtonStyle = {
  textAlign: 'left',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
}

export const getToolbarInitialState = () => toolbarInitialState

export const setToolbarInitialState = (newInitialState: PartialButtonStyle) => {
  return {
    ...toolbarInitialState,
    ...newInitialState,
  }
}
