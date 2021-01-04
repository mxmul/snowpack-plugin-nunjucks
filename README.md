# snowpack-plugin-nunjucks

[![npm][npm]][npm-url]

Use [Nunjucks](https://mozilla.github.io/nunjucks/) to build `.html` and `.njk` files from source.

### Usage

From a terminal, run the following:

```
npm install --save-dev snowpack-plugin-nunjucks
```

Then add this plugin to your Snowpack config:

```js
// snowpack.config.json
{
  "plugins": [
    "snowpack-plugin-nunjucks"
  ]
}
```

### Plugin Options

| Name        | Type                         | Description                                                                                                                   |
| ----------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `path`      | `string`                     | (optional) The template path, as passed to `nunjucks.configure` (default: `process.cwd()`)                                    |
| `opts`      | `string`                     | (optional) All other options accepted by `nunjucks.configure`.                                                                |
| `extendEnv` | `(env: Environment) => void` | (optional) A callback that's provided the Nunjucks `Environment` before rendering, which lets you add filters and extensions. |


[npm]: https://img.shields.io/npm/v/snowpack-plugin-nunjucks.svg
[npm-url]: https://npmjs.com/package/snowpack-plugin-nunjucks
