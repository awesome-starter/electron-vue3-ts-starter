/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const path = require('path')
const components = require('unplugin-vue-components/webpack')
const pkg = require('./package.json')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 10086,
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#1890ff',
            hack: `true; @import '@less/config.less'`,
          },
        },
      },
    },
  },
  // 自定义打包选项
  // pluginOptions: {
  //   electronBuilder: {
  //     nodeIntegration: true,
  //     builderOptions: {
  //       extraResources: ['./config/**'],
  //       productName: 'Awesome Starter Client',
  //       nsis: {
  //         oneClick: false,
  //         createDesktopShortcut: 'always',
  //         allowToChangeInstallationDirectory: true,
  //       },
  //     },
  //   },
  // },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@img', resolve('src/assets/img'))
      .set('@less', resolve('src/assets/less'))
      .set('@fonts', resolve('src/assets/fonts'))
      .set('@css', resolve('src/assets/css'))
      .set('@libs', resolve('src/libs'))
      .set('@cp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .end()
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'static/img/[name].[hash:8].[ext]',
          },
        },
      })
      .end()
  },
  configureWebpack: () => {
    return {
      plugins: [
        new webpack.BannerPlugin(
          `name: ${pkg.name}\nversion: ${pkg.version}\nauthor: ${pkg.author}`
        ),
        components({
          dirs: ['src/components'],
          extensions: ['vue', 'ts'],
          deep: true,
          dts: false,
        }),
      ],
    }
  },
}
