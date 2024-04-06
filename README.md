# Pokemon Dropdown Component

This project contains a React input component that allows users to select a Pokemon from a dropdown list.

## Installation

To install the dependencies, run the following command:

```bash
npm install react-pokemon-dropdown
```

## Usage

To use the Pokemon Dropdown component in your project, first import it:

```bash
import PokeDrop from 'react-pokemon-dropdown';
```

Then, you can use it in your JSX like this:

```bash
<PokeDrop value={"Pikachu"} onChange={handleOnChange} />
```

The onChange prop is a function that will be called whenever the selected Pokemon changes. It will be passed the name of the selected Pokemon.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
