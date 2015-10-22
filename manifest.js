'use strict'

var pkg = require('./package.json')

var getJs = function(name) {
  return 'contents/' +  name + '/index.js'
}

var getCss = function(name) {
  return 'contents/' +  name + '/index.css'
}

var contents = [
  {
    matches: ['http://weibo.com/p/*/album?*'],
    module: 'weibo-album'
  }
]

module.exports = {
  name: pkg.name,
  version: pkg.version,
  manifest_version: 2,
  description: pkg.description,
  icons: {
    128: 'icon_128.png'
  },
  // options_page: 'options/index.html',
  background: {
    scripts: ['background/index.js']
  },
  permissions: ['contextMenus', 'downloads'],
  homepage_url: pkg.homepage,

  content_scripts: contents.map(function(item) {
    return {
      matches: item.matches,
      js: [getJs('global'), getJs(item.module)],
      css: [getCss('global'), getCss(item.module)],
      run_at: 'document_end'
    }
  })
}
