/* eslint-disable  */
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': '#FF643C',
      '@layout-body-background': '#2b3237',
      '@layout-header-background': '#2b3237',
      '@layout-footer-background': '#2b3237',
    },
  })(config, env);

  return config;
};
