import React, { useState, FC, CSSProperties } from "react"
import pokemonData from "./data"

export interface Pokemon {
  id: number
  name: string
}

export interface DropProps {
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

// Separate the search logic into a custom hook
function useSearch(items: Pokemon[], searchTerm: string) {
  return searchTerm
    ? items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : items
}

// Abstract the onChange call into a separate function
function callOnChange(onChange: DropProps["onChange"], value: string) {
  if (typeof onChange === "function") {
    onChange(value)
  }
}

const PokeDrop: FC<DropProps> = ({
  clearIcon,
  dropdownIcon,
  noResultsText,
  onChange,
  placeholder,
  showId = true,
  style,
  value = "",
}) => {
  const inputRef = React.createRef<HTMLInputElement>()

  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(value)
  const filteredPokemon = useSearch(pokemonData, searchTerm)

  const formatId = (id: number) => {
    return `#${id.toString().padStart(3, "0")}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    callOnChange(onChange, value)
  }

  const handleOptionClick = (name: string) => {
    setSearchTerm(name)
    callOnChange(onChange, name)
    setIsOpen(false)
  }

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 100)
  }

  const handleFocus = () => {
    setIsOpen(true)
    searchTerm && inputRef.current?.select()
  }

  const handleClear = () => {
    setIsOpen(false)
    callOnChange(onChange, "")
    setSearchTerm("")
  }

  return (
    <div
      style={{ ...styles.dropdown, ...style?.container }}
      onBlur={handleBlur}
    >
      <div style={{ ...styles.input, ...style?.input }}>
        <input
          type="text"
          style={{ ...styles.searchInput, ...style?.searchInput }}
          placeholder={placeholder ? placeholder : "Select pokemon"}
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
          ref={inputRef}
          id={"pokemon-search#input"}
          className={"pokemon-search#input"}
        />
        {isOpen && (
          <div onClick={handleClear} style={{ ...styles.icon, ...style?.icon }}>
            {clearIcon ? clearIcon() : "X"}
          </div>
        )}
        {!isOpen && dropdownIcon && (
          <div
            onClick={() => setIsOpen(!isOpen)}
            style={{ ...styles.icon, ...style?.icon }}
          >
            {dropdownIcon()}
          </div>
        )}
      </div>
      {isOpen && (
        <div style={{ ...styles.structure, ...style?.dropdown }}>
          {filteredPokemon.length ? (
            filteredPokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                onMouseUp={() => handleOptionClick(pokemon.name)}
                id={pokemon.id.toString()}
                style={{ ...styles.option, ...style?.option }}
              >
                <h5 style={{ ...styles.optionText, ...style?.optionText }}>
                  {showId
                    ? `${formatId(pokemon.id)} ${pokemon.name}`
                    : pokemon.name}
                </h5>
              </div>
            ))
          ) : (
            <div
              key={"none"}
              id={"none"}
              aria-disabled={true}
              style={{ ...styles.option, ...style?.option, ...style?.noOption }}
            >
              <h5
                style={{
                  ...styles.optionText,
                  ...style?.optionText,
                  ...style?.noOptionText,
                }}
              >
                {noResultsText ? noResultsText : "No Results"}
              </h5>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const styles: { [key: string]: CSSProperties } = {
  dropdown: {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  input: {
    fontSize: "14px",
    color: "#333",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  selected: {
    color: "#fff",
  },
  placeholder: {
    color: "#6c757d",
  },
  structure: {
    maxHeight: "500px",
    overflowY: "scroll",
  },
  option: {
    padding: "10px",
    cursor: "pointer",
  },
  optionText: {
    margin: 0,
  },
  searchInput: {
    width: "100%",
    padding: "10px 20px 10px 10px",
  },
  icon: {
    right: "10px",
    top: "calc(50% - 8px)",
    cursor: "pointer",
    position: "absolute",
    zIndex: 5000,
  },
}

export default PokeDrop
