const WebpackObfuscator = require('webpack-obfuscator'); // 代码加密webpack-obfuscator包
const TerserPlugin = require('terser-webpack-plugin'); // 代码压缩混淆terser-webpack-plugin包

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'?'/event/231024/':'./', // 基本路径
  productionSourceMap: false, //禁用生产环境的源映射文件
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {

      // 启用Webpack Obfuscator插件进行代码加密
      config.plugins.push(
        new WebpackObfuscator({
          rotateUnicodeArray: true, // 打乱Unicode数组顺序
        })
      );

      // 启用Terser插件进行代码压缩、混淆
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            mangle: true, // 开启变量名混淆
            drop_console: true, // 移除所有的console.log语句
          },
        })
      );

    
    }
      
  },
})
