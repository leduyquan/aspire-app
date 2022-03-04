module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      });
  },
};
// module.exports = {
//   assetsDir: 'assets/',
//   filenameHashing: false,

//   chainWebpack: config => {
//     const imagesRule = config.module.rule("images");
//     imagesRule.uses.clear();

//     imagesRule.test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
//     .use('url-loader')
//     .loader('url-loader')
//     .tap(options => {
//       options = {
//         limit: -1,
//         name: 'assets/img/[name].[ext]'
//       }
//       return options
//     }).end();

//     const svgRule = config.module.rule('svg');
//     svgRule.uses.clear();
//     svgRule
//       .use('vue-svg-loader')
//         .loader('vue-svg-loader')

//     // svgRule.test(/\.(svg)(\?.*)?$/)
//     // .use('file-loader')
//     // .loader('file-loader')
//     // .tap(options => {
//     //   options = {
//     //     limit: -1,
//     //     name: 'assets/fonts/[name].[ext]'
//     //   }
//     //   return options
//     // }).end();

//     const fontsRule = config.module.rule('fonts');
//     fontsRule.uses.clear();

//     fontsRule.test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
//     .use('url-loader')
//     .loader('url-loader')
//     .tap(options => {
//       options = {
//         limit: -1,
//         name: 'assets/fonts/[name].[ext]'
//       }
//       return options
//     }).end();

//     if(config.plugins.has('extract-css')) {
//       const extractCSSPlugin = config.plugin('extract-css')
//       extractCSSPlugin && extractCSSPlugin.tap(() => [{
//         filename: 'assets/css/[name].css',
//         chunkFilename: 'assets/css/[name].css'
//       }])
//     }

//     //config.plugins.delete("html").delete("prefetch").delete("preload");
//   },

//   lintOnSave: false,
//   productionSourceMap: false,
//   parallel: false
// };
