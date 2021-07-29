const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    }
  }

  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return config
}

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
  resolve: {
    // расширения которые понимаются при импорте без указания (чтобы не писать расширения при импорте)
    extensions: ['.js', '.json', '.css'],
    // используем чтобы не прописывать полный путь к файлу
    alias: {
      'models': path.resolve(__dirname, 'src/models'),
    },
  },
  optimization: optimization(),
  plugins: [
      // создает html в dist и подключает чанки
      new HTMLWebpackPlugin({
        // указываем основной html файл чтобы подтянуть содержимое из него
        template: "./index.html",
        // исп для оптимизации html
        minify: {
          collapseWhitespace: !isDev,
        }
      }),
      // используется для удаления ненужных чанков
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [{
          from: path.resolve(__dirname, 'src/assets/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        }]
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      })
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
          use: [
            //если хотим добавить опции записываем как объект
            {
              loader: MiniCssExtractPlugin.loader,
              // options: {
              //   // изменения вносятся без перзагрузки проекта
              //   hrm: isDev,
              //   reloadAll: true,
              // }
            },
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpeg|svg|gif)$/,
          use: ['file-loader']
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          use: ['file-loader']
        }
        //при необходимости добавляем лодер для xml
   ]
 },
  // предварительно ставим webpack-dev-server, исп для мгновенного отображения изменений файлов
  devServer: {
    port: 4200,
    hot: isDev,
  }
}
