export type TButtonOption = {
  typeButton: string
  active: boolean
  value: Partial<TButtonStyle>
}

export type TButtonStyle = {
  textAlign: 'left' | 'center' | 'right'
  fontWeight: 'normal' | 'bold'
  fontStyle: 'normal' | 'italic'
  textDecoration: 'none' | 'underline'
}

export type PartialButtonStyle = Partial<TButtonStyle>
