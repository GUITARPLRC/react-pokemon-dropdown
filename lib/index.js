import React, { useState } from "react";
import pokemonData from "./data";
function useSearch(items, searchTerm) {
    return searchTerm
        ? items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : items;
}
function callOnChange(onChange, value) {
    if (typeof onChange === "function") {
        onChange(value);
    }
}
const PokeDrop = ({ clearIcon, dropdownIcon, noResultsText, onChange, placeholder, showId = true, style, value = "", }) => {
    const inputRef = React.createRef();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value);
    const filteredPokemon = useSearch(pokemonData, searchTerm);
    const formatId = (id) => {
        return `#${id.toString().padStart(3, "0")}`;
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        callOnChange(onChange, value);
    };
    const handleOptionClick = (name) => {
        setSearchTerm(name);
        callOnChange(onChange, name);
        setIsOpen(false);
    };
    const handleBlur = () => {
        setTimeout(() => setIsOpen(false), 100);
    };
    const handleFocus = () => {
        var _a;
        setIsOpen(true);
        searchTerm && ((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.select());
    };
    const handleClear = () => {
        setIsOpen(false);
        callOnChange(onChange, "");
        setSearchTerm("");
    };
    return (React.createElement("div", { style: Object.assign(Object.assign({}, styles.dropdown), style === null || style === void 0 ? void 0 : style.container), onBlur: handleBlur },
        React.createElement("div", { style: Object.assign(Object.assign({}, styles.input), style === null || style === void 0 ? void 0 : style.input) },
            React.createElement("input", { type: "text", style: Object.assign(Object.assign({}, styles.searchInput), style === null || style === void 0 ? void 0 : style.searchInput), placeholder: placeholder ? placeholder : "Select pokemon", value: searchTerm, onChange: handleChange, onFocus: handleFocus, ref: inputRef, id: "pokemon-search#input", className: "pokemon-search#input" }),
            isOpen && (React.createElement("div", { onClick: handleClear, style: Object.assign(Object.assign({}, styles.icon), style === null || style === void 0 ? void 0 : style.icon) }, clearIcon ? clearIcon() : "X")),
            !isOpen && dropdownIcon && (React.createElement("div", { onClick: () => setIsOpen(!isOpen), style: Object.assign(Object.assign({}, styles.icon), style === null || style === void 0 ? void 0 : style.icon) }, dropdownIcon()))),
        isOpen && (React.createElement("div", { style: Object.assign(Object.assign({}, styles.structure), style === null || style === void 0 ? void 0 : style.dropdown) }, filteredPokemon.length ? (filteredPokemon.map((pokemon) => (React.createElement("div", { key: pokemon.id, onMouseUp: () => handleOptionClick(pokemon.name), id: pokemon.id.toString(), style: Object.assign(Object.assign({}, styles.option), style === null || style === void 0 ? void 0 : style.option) },
            React.createElement("h5", { style: Object.assign(Object.assign({}, styles.optionText), style === null || style === void 0 ? void 0 : style.optionText) }, showId
                ? `${formatId(pokemon.id)} ${pokemon.name}`
                : pokemon.name))))) : (React.createElement("div", { key: "none", id: "none", "aria-disabled": true, style: Object.assign(Object.assign(Object.assign({}, styles.option), style === null || style === void 0 ? void 0 : style.option), style === null || style === void 0 ? void 0 : style.noOption) },
            React.createElement("h5", { style: Object.assign(Object.assign(Object.assign({}, styles.optionText), style === null || style === void 0 ? void 0 : style.optionText), style === null || style === void 0 ? void 0 : style.noOptionText) }, noResultsText ? noResultsText : "No Results")))))));
};
const styles = {
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
};
export default PokeDrop;
//# sourceMappingURL=index.js.map