<h1 align="center"><code>toml-parse.js</code></h1>

<p align="center">Simple TOML parser</p>

## ⚙️ Installation

```js
npm i toml-parse
```

**CDN Links:**
- https://cdn.jsdelivr.net/npm/toml-parse@1.0.0/toml-parse.js
- https://www.unpkg.com/toml-parse@1.0.0/toml-parse.js

## 📖 Usage

#### ● Import

```js
// ES6
import tomlParse from "toml-parse";

// commonjs
const tomlParse = require("toml-parse");
```

#### ● From TOML to JSON

```js
const tomlCode = `
# Example TOML code
title = "Hello, World"
[author]
name = "John Doe"
age = 30
`;

const json = tomlParse.toJSON(tomlCode);

console.log(json);
```

#### ● From JSON to TOML

```js
const json = {
  title: 'Hello, World',
  author: { name: 'John Doe', age: 30 }
};

const tomlCode = tomlParse.fromJSON(json);

console.log(tomlCode);
```

#### ● From TOML to CSS

```js
const tomlCode = `
# Example TOML code
[body]
background-color = "white"
color = "black"
`;

const cssCode = tomlParse.toCSS(tomlCode);

console.log(cssCode);
```

#### ● From CSS to TOML

```js
const cssCode = `
body {
  background-color: white;
  color: black;
}
h1, h2 {
  font-weight: bold;
}
`;

const tomlCode = tomlParse.fromCSS(cssCode);

console.log(tomlCode);
```

#### ● JavaScript value to TOML value

```js
const value = 'Hello, World!';

const tomlValue = tomlParse.toTomlValue(value);

console.log(tomlValue);
```

#### ● TOML value to JavaScript value

```js
const value = 'true';

const parsed = tomlParse.parseValue(value);

console.log(parsed);
```

#### ● Get table

```js
const json = {
  fruits: {
    apple: 'red',
    banana: 'yellow'
  }
};

const tableName = 'fruits.apple';

const table = tomlParse.getTable(json, tableName);

console.log(table);
```

#### ● Set key

```js
const json = {
  fruits: {
    apple: 'red',
    banana: 'yellow'
  }
};

const key = 'fruits.apple';
const value = 'green';

tomlParse.setKey(json, key, value);

console.log(json);
```

---

[Support me on Patreon](https://www.patreon.com/axorax) — 
[Check out my socials](https://github.com/axorax/socials)