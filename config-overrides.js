const {fixBabelImports, override, addLessLoader, removeModuleScopePlugin, watchAll, addWebpackModuleRule} = require("customize-cra");

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#52c41a'}
    }),
    removeModuleScopePlugin(),
    watchAll(),
);