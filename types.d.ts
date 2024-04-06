// PokeDrop.d.ts

interface Pokemon {
  id: number
  name: string
}

interface DropProps {
  clearIcon?: () => JSX.Element
  dropdownIcon?: () => JSX.Element
  noResultsText?: string
  onChange?: (value: string) => void
  placeholder?: string
  showId?: boolean
  style?: {
    container?: React.CSSProperties
    input?: React.CSSProperties
    searchInput?: React.CSSProperties
    icon?: React.CSSProperties
    dropdown?: React.CSSProperties
    option?: React.CSSProperties
    optionText?: React.CSSProperties
    noOption?: React.CSSProperties
    noOptionText?: React.CSSProperties
  }
  value?: string
}

declare const PokeDrop: React.FC<DropProps>
