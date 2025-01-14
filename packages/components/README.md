# @packages/components

react常用组件爱你

> `Rslib`默认情况下，当生成 `CJS` 或 `ESM` 产物时，`dependencies`、`optionalDependencies` 和 `peerDependencies` 字段下的三方依赖不会被 `Rslib` 打包。

> 默认这里直接走源码,不进行构建. 这样应用打包最小, 开发也最快 如果需要构建(一般用于发布npm包),则可以如下操作

1. 打开`package.json`, 进行修改
2. 修改`main`为`/dist/cjs/index.js`
3. 修改`exports`的`import`, 为 `"import": "./dist/esm/index.mjs"`
4. 修改`scripts`的`build`和`dev`, 将`echo`语句去除
