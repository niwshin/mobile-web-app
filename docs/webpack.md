# webpack, node, npm 関連

## dev server の設定オブジェクトの書き方が変わったよ

- [webpack-dev-serverからcontentBaseが消えてエラーになる](https://zenn.dev/miz_dev/articles/fbd8c297601022)

- [webpack 公式](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)

## webpack 公式の init

[https://webpack.js.org/configuration/](https://webpack.js.org/configuration/) でインストールすると、 `npm autit fix` で critical が 5件ある。`webpack-cli` が依存している `@webpack-cli/generators` の依存パッケージで critical 5件だった。`@webpack-cli/generators` を削除して `webpack-cli` の再インストールで復活。

## npm-run-all

[npm-run-all](https://github.com/mysticatea/npm-run-all) を使えば同時実行できる。
つまり、 `tsc --watch` しながら `webpack serve` できる

## Error: createRoot(...): Target container is not a DOM element

パス解決はリポジトリがrootのため、おかしいことに。

- ダメだった例

```JS
    new HtmlWebpackPlugin({
      template: "index.html", // ここがダメっぽい。
    }),
```

- うまくいった例

```JS
    new HtmlWebpackPlugin({
      template: "src/index.html", 
    }),
```
