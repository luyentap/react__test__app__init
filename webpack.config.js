const path = require('path') // lấy đường dẫn tuyệt đối của thư mục
console.log("path of @@: ");
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack'); //to access built-in plugins


const config = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js', //Code splitting thay cho bundel.js
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
        //loader các presets,.. vào webpack
        //Biến đổi ES6 -> ES5 (nhưng chúng ta đã biết có 1 số trình duyệt không hỗ trợ es6, vì vậy cần thằng này để mình có thể sử dụng được trên tất cả các trình duyệt khác nhau)
        // Webpack giúp kết nối các module lại với nhau:
        // balel-loader kết nối babel vs webpack
        // babel-core lấy và phân tích mã, output ra 1 số file
        // babel-preset-env đảm nhận phần gọi biến đổi es6 -> es5
        // babel-preset-react đản nhận phần biến đổi jsx -> js (Vì mình làm việc vs react nên cần mấy cái chuyển đổi này nhé ^^)
      {
        use: 
            {   
                loader:'babel-loader',
                //có thể truyền vào từ config webpack/ babel.config.js
                // options: {
                //     presets: ['@babel/preset-env',"@babel/preset-react"]
                // }
        },
        exclude: /node_modules/, //loại trừ
        test: /\.js$/,           //loader loại file này
        
      },
      //load file hình ảnh/font/...
      {
        test: /\.(png|jpe?g|gif|ico|woff(2)?|ttf|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      
      //style loader
        //Mấy cái loader này sẽ được thực hiện theo thứ tự
        // sass-loader transforms Sass thành CSS.
        // css-loader parses CSS vào JavaScript và resolve dependencies.
        // style-loader chèn CSS vào bên trong thẻ <style>
        // Có thể hình dung nó như một function với callback là một function khác
        // styleLoader(cssLoader(sassLoader("source")))
            {
            test:/\.css$/,
            use:['style-loader','css-loader'] //vẫn đang bị lỗi sass-loader-->chưa use sass
        },

      // {
      //   test: /\.js$/,
      //   exclude: [/node_modules/,/index.js/,/serviceWorker.js/],
      //   use: ["eslint-loader"]
      // }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    //inject bundel vào index.html, dùng bản 3.0.7 fix lỗi undentified nếu xảy ra(linux,node 10)
    new HtmlWebpackPlugin({template: __dirname+'/public/index.html',inject: true,filename:"index.html",hash: true}),
    
    //reload lại phần nào thay đổi trong html
    new webpack.HotModuleReplacementPlugin(),
    //nếu lỗi, ko tải lại trang mà chỉ console log
    new webpack.NoEmitOnErrorsPlugin(),
    
  ],
  
  //fix for c9.io : check host:Invalid Host header
  devServer: {
    compress: true,
    disableHostCheck: true,

    //hot reload
    port: 8080,
    hot: true,
    inline: true,
    publicPath: '/',
 }  
}

module.exports = config;
//doc them:https://viblo.asia/p/nhung-van-de-nham-lan-khi-su-dung-webpack-maGK7WdaKj2
//webpack-dev-server  --hot(load all page) khac --inline(khong toan bo trang)
//(link ghi sai)