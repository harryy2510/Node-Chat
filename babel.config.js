const libs = ['lodash', 'lodash-es']
const babelImportOptimized = libs.map((l) => [
    'import',
    {
        libraryName: l,
        libraryDirectory: '',
        camel2DashComponentName: false
    },
    l
])
module.exports = {
    presets: [
        ['@babel/preset-env', { modules: false }],
        ['react-app', { absoluteRuntime: false, flow: false, typescript: true }]
    ],
    plugins: [...babelImportOptimized]
}
