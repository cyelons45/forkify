const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin')

module.exports = {
  

  entry: ["babel-polyfill","./src/js/index.js"], // string | object | array
  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "bundle.js", // string

  },
  devServer:{
      contentBase:'./dist'

  },
  plugins:[new HtmlWebpackPlugin({
    filename:'index.html',
    template:'./src/index.html'

  })
],
module:{
  rules:[
    {
      test:/\.js$/,
      exclude:/node_modules/,
      use:{
        loader:'babel-loader'

      }
    }
  ]
}
}