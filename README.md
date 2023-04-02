# string-to-color

[![npm version](https://img.shields.io/npm/v/@marko19907/string-to-color.svg)](https://www.npmjs.com/package/@marko19907/string-to-color)
[![npm downloads per week](https://badgen.net/npm/dw/@marko19907/string-to-color)](https://www.npmjs.com/package/@marko19907/string-to-color)
[![minified size](https://badgen.net/bundlephobia/min/@marko19907/string-to-color?label=minified)](https://bundlephobia.com/result?p=@marko19907/string-to-color)
[![gzip size](https://badgen.net/bundlephobia/minzip/@marko19907/string-to-color?label=gzipped)](https://bundlephobia.com/result?p=@marko19907/string-to-color)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Build](https://github.com/Marko19907/string-to-color/actions/workflows/main.yml/badge.svg?branch=main&label=Build)](https://github.com/Marko19907/string-to-color/actions/workflows/main.yml)
[![Dev build](https://github.com/Marko19907/string-to-color/actions/workflows/main.yml/badge.svg?branch=dev&label=Dev%20build)](https://github.com/Marko19907/string-to-color/actions/workflows/main.yml)


string-to-color is a library that deterministically generates an HSL color based on a given string.

It's useful for generating consistent colors for user avatars, boxes, and other visualizations where you need
a color that is unique to a specific input value. 
The library also supports tree shaking, allowing for more efficient bundling of your code.

## [Demo](https://marko19907.github.io/string-to-color-demo/)
Check out the live demo of the library to see it in action!

The source code for the demo is available [here](https://github.com/Marko19907/string-to-color-demo)

## Installation

To install the library, use your favorite package manager:

```bash
npm install @marko19907/string-to-color
```

```bash
yarn add @marko19907/string-to-color
```

## Usage

### Generating a color

The library provides two functions, `generateColor()` and `generateSecondaryColor()`, that generate HSL colors from a given string.

```js
import { generateColor, generateSecondaryColor } from "@marko19907/string-to-color";

const username = "JohnDoe";
const primaryColor = generateColor(username); // generates a primary color based on the username
const secondaryColor = generateSecondaryColor(username); // generates a secondary color based on the username
```

Both functions accept an optional `ColorOptions` object that can be used to customize the
saturation, lightness, and alpha values of the generated color.

```js
const options = { saturation: 50, lightness: 75, alpha: 100 };
const primaryColor = generateColor(username, options); // generates a primary color with custom saturation, lightness, and alpha values
```

If no options are provided, the default values of `saturation: 75`, `lightness: 50`, and `alpha: 100` are used.

It is also possible to just provide a subset of the options, and the rest will be filled in with the default values.

```js
const color = generateColor("abc", { saturation: 80 }); 
```

One can also call the function without any custom options like this. The rest will be filled in with the default values.

```js
const color = generateColor("abc");
```

### Generating a gradient

The library also provides a function, `generateGradient()`, that generates a gradient from a given string.

```js
import { generateGradient } from "@marko19907/string-to-color";

const username = "JohnDoe";
const gradient = generateGradient(username); // generates a gradient based on the username
```

The gradient is generated using the `generateColor()` and `generateSecondaryColor()` functions, and is returned as a string in the format `linear-gradient(45deg, primaryColor, secondaryColor)`.

The function accepts an optional angle parameter that sets the angle of the gradient, and two optional ColorOptions objects that can be used to customize each of the colors of the gradient.

```js
const options = { saturation: 50, lightness: 75, alpha: 100 };
const secondaryOptions = { saturation: 100, lightness: 75, alpha: 100 };
const gradient = generateGradient(username, 90, options, secondaryOptions); // generates a gradient with custom options and a 90 degree angle
```

If no options are provided, the default values of `angle: 45`, `saturation: 75`, `lightness: 50`, and `alpha: 100` are used for both colors of the gradient.

### Usage with React and `useMemo()`

If you're using string-to-color in a React application, you can use the `useMemo()` hook to avoid unnecessary re-renders and improve performance.

Here's an example of generating a primary color based on a user's id using useMemo():

```js
import { useMemo } from "react";
import { generateColor } from "@marko19907/string-to-color";

function Avatar({ user }) {
const primaryColor = useMemo(() => {
    return generateColor(user.id);
}, [user]);

return (
    <div style={{ backgroundColor: primaryColor }}>
        {user.name}
    </div>
);
}
```

## Acknowledgments
This repository is based on a template by Matt Pocock.
The template can be found in this repository [mattpocock/pkg-demo](https://github.com/mattpocock/pkg-demo)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details

## Contributing
Pull requests and bug reports are welcome! 
