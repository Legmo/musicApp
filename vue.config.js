const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname,"./src/assets/css/site.scss")]
    }
  },
  // devServer: {
  //   proxy: 'http://aerostat.dev.baikalweb.com/'
  // }
};
