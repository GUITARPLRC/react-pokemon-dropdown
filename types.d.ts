// PokeDrop.d.ts
import { FC, CSSProperties } from "react"

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
    container?: CSSProperties
    input?: CSSProperties
    searchInput?: CSSProperties
    icon?: CSSProperties
    dropdown?: CSSProperties
    option?: CSSProperties
    optionText?: CSSProperties
    noOption?: CSSProperties
    noOptionText?: CSSProperties
  }
  value?: string
}

declare const PokeDrop: FC<DropProps>

export default PokeDrop
