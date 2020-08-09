1. 
```bash
npm init -y
npm i -D webpack webpack-cli
npm install --save react react-dom  
npm install --save-dev babel-loader @babel/preset-react @babel/preset-env @babel/core
/*
    **babel-loader：**使用Babel和webpack来转译JavaScript文件。
    **@babel/preset-react：**转译react的JSX
    **@babel/preset-env：**转译ES2015+的语法
    **@babel/core：**babel的核心模块
/*

npm install --save-dev html-webpack-plugin // html 插件
npm install --save-dev clean-webpack-plugin  // 清除dist目录

// entry 添加framework: ['react','react-dom']
// 再使用配置optimization.splitChunks的方式 抽离公共代码

optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      cacheGroups: {
        framework: {
          test: "framework",
          name: "framework",
          enforce: true
        },
        vendors: {
          priority: -10,
          test: /node_modules/,
          name: "vendor",
          enforce: true,
        },
      }
    }
  },

cacheGroups对象，定义了需要被抽离的模块，其中test属性是比较关键的一个值，他可以是一个字符串，也可以是正则表达式，还可以是函数。如果定义的是字符串，会匹配入口模块名称，会从其他模块中把包含这个模块的抽离出来。name是抽离后生成的名字，和入口文件模块名称相同，这样抽离出来的新生成的framework模块会覆盖被抽离的framework模块，虽然他们都叫framework。
vendors这个缓存组，它的test设置为 /node_modules/ 表示只筛选从node_modules文件夹下引入的模块，所以所有第三方模块才会被拆分出来。

npm install uglifyjs-webpack-plugin --save-dev // 压缩js代码 
弃用 使用terser-webpack-plugin


npm install webpack-dev-server --save-dev // 本地开发环境 热更新

npm install --save-dev style-loader css-loader
css-loader 作用是处理 CSS 文件中的 @import 和 url() 返回一个合并后的 CSS 字符串，而 style-loader 负责将返回的 CSS 字符串用 style 标签插到 DOM 中，并且还实现了 webpack 的热更新接口。  
遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件，遇到“@import”等语句就将相应样式文件引入（所以如果没有css-loader，就没法解析这类语句），最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
loader是有顺序的，webpack肯定是先将所有css模块依赖解析完得到计算结果再创建style标签。因此应该把style-loader放在css-loader的前面（webpack loader的执行顺序是从右到左）。

npm install --save-dev mini-css-extract-plugin // loader打包只是通过js把css全部插入，通过这个插件可以打包成文件插入header
npm install --save-dev optimize-css-assets-webpack-plugin //压缩css
npm i node-sass sass-loader

npm install postcss postcss-loader --save-dev
npm install autoprefixer --save-dev

postcss 一种对css编译的工具，类似babel对js的处理，常见的功能如：
1 . 使用下一代css语法
2 . 自动补全浏览器前缀
3 . 自动把px代为转换成rem
4 . css 代码压缩等等
postcss 只是一个工具，本身不会对css一顿操作，它通过插件实现功能，autoprefixer 就是其一。

postcss 是 CSS 后处理器工具，因为先有 CSS，postcss 后去处理它，所以叫后处理器。

less/sass 被称之为 CSS 预处理器，因为它们需要被 less 或 node-sass 预先编译代码到 CSS 嘛。

cnpm install sass-resources-loader -D // 设置sass变量文件

cnpm install cross-env -D // 解决 process.env.NODE_ENV  undefined
cnpm i friendly-errors-webpack-plugin -D // 控制台的输出更加友好
cnpm i -D progress-bar-webpack-plugin
npm install file-loader url-loader --save-dev
eslint
npm install --save-dev eslint babel-eslint eslint-plugin-react eslint-config-alloy
npm install husky lint-staged -D
```  
2.  
```bash
    
```

