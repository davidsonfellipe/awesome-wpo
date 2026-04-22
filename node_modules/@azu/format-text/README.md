## @azu/format-text

String formatting library inspired from Python

Fork of [azer/format-text](https://github.com/azer/format-text "azer/format-text: String formatting library inspired from Python")

### Install

```bash
$ npm install @azu/format-text
```

### Usage

```js
format = require('@azu/format-text')

format('Hello {0}. The weather is currently {1}°.', 'Kitty', '67')
// => Hello Kitty. The weather is currently 67°.

format('Hello {name}, The weather is currently {degree}°', { name:'Kitty', degree: 67 })
// => Hello Kitty. The weather is currently 67°.
```