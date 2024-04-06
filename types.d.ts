interface Pokemon {
  id: number
  name: string
}

interface DropProps {
  dropdownIcon?: () => React.ReactNode
  clearIcon?: () => React.ReactNode
  style?: {
    container?: React.CSSProperties
    input?: React.CSSProperties
    dropdown?: React.CSSProperties
    option?: React.CSSProperties
    optionText?: React.CSSProperties
    searchInput?: React.CSSProperties
    noOption?: React.CSSProperties
    noOptionText?: React.CSSProperties
    icon?: React.CSSProperties
  }
  showId?: boolean
  value?: string
  onChange?: any
  placeholder?: string
  noResultsText?: string
}
