// 加载插件
const Plugins = require.context('./plugins', true, /\.js$/)
Plugins.keys().map(Plugins)
