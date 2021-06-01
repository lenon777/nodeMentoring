//{
//    "presets": [["@babel/preset-env", { "targets": { "node": "current" } }]],
//    "plugins": ["@babel/plugin-transform-runtime"]
	
//}
//{
//	"presets": ["@babel/preset-env"],
//	"plugins": ["transform-runtime"]
//  }

// babel.config.js
module.exports = {
	presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
	"plugins": ["@babel/plugin-transform-runtime"]
  };