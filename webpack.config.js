const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  // указывает где лежат все исходники (можем из путей убрать src/)
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    // делаем две точки входа и на выходе имеем два разных чанка
    main: './index.js',
    analytics: './analytics.js'
  },
  output: {
    // в name подставляется название чанка из entry
    // contenthash  исп чтобы каждый раз файл при изменении имел новое имя, которое зависит от содержимого (надо тчобы отображались изменения в файле при кешировании)
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
      // создает html в dist и подключает чанки
      new HTMLWebpackPlugin({
        // указываем основной html файл чтобы подтянуть содержимое из него
        template: "./index.html"
      }),
      // используется для удаления ненужных чанков
      new CleanWebpackPlugin(),
  ],
  // для возможности работы не только с js, json
  module: {
    rules: [
        {
          //регулярка, чтобы определить нужные расширения
          test: /\.css$/,
          // Используем лодеры для данных форматов. Обработка идет справа налево
          // css-loader - позволяет исп импорты
          // style-loader - добавляет стили в секцию head в html
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpeg|svg|gif)$/,
          use: ['file-loader']
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          use: ['file-loader']
        }
   ]
 }
}