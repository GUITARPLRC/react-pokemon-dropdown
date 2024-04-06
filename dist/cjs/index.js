"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const data_1 = __importDefault(require("./data"));
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
    const inputRef = react_1.default.createRef();
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)(value);
    const filteredPokemon = useSearch(data_1.default, searchTerm);
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
    return (react_1.default.createElement("div", { style: Object.assign(Object.assign({}, styles.dropdown), style === null || style === void 0 ? void 0 : style.container), onBlur: handleBlur },
        react_1.default.createElement("div", { style: Object.assign(Object.assign({}, styles.input), style === null || style === void 0 ? void 0 : style.input) },
            react_1.default.createElement("input", { type: "text", style: Object.assign(Object.assign({}, styles.searchInput), style === null || style === void 0 ? void 0 : style.searchInput), placeholder: placeholder ? placeholder : "Select pokemon", value: searchTerm, onChange: handleChange, onFocus: handleFocus, ref: inputRef, id: "pokemon-search#input", className: "pokemon-search#input" }),
            isOpen && (react_1.default.createElement("div", { onClick: handleClear, style: Object.assign(Object.assign({}, styles.icon), style === null || style === void 0 ? void 0 : style.icon) }, clearIcon ? clearIcon() : "X")),
            !isOpen && dropdownIcon && (react_1.default.createElement("div", { onClick: () => setIsOpen(!isOpen), style: Object.assign(Object.assign({}, styles.icon), style === null || style === void 0 ? void 0 : style.icon) }, dropdownIcon()))),
        isOpen && (react_1.default.createElement("div", { style: Object.assign(Object.assign({}, styles.structure), style === null || style === void 0 ? void 0 : style.dropdown) }, filteredPokemon.length ? (filteredPokemon.map((pokemon) => (react_1.default.createElement("div", { key: pokemon.id, onMouseUp: () => handleOptionClick(pokemon.name), id: pokemon.id.toString(), style: Object.assign(Object.assign({}, styles.option), style === null || style === void 0 ? void 0 : style.option) },
            react_1.default.createElement("h5", { style: Object.assign(Object.assign({}, styles.optionText), style === null || style === void 0 ? void 0 : style.optionText) }, showId
                ? `${formatId(pokemon.id)} ${pokemon.name}`
                : pokemon.name))))) : (react_1.default.createElement("div", { key: "none", id: "none", "aria-disabled": true, style: Object.assign(Object.assign(Object.assign({}, styles.option), style === null || style === void 0 ? void 0 : style.option), style === null || style === void 0 ? void 0 : style.noOption) },
            react_1.default.createElement("h5", { style: Object.assign(Object.assign(Object.assign({}, styles.optionText), style === null || style === void 0 ? void 0 : style.optionText), style === null || style === void 0 ? void 0 : style.noOptionText) }, noResultsText ? noResultsText : "No Results")))))));
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
exports.default = PokeDrop;
//# sourceMappingURL=index.js.map