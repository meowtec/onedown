/* global chrome */

console.log('***** one download *****');

/** utils */
function insertDownloadIcon(node) {

}

function download(urls) {
  chrome.extension.sendRequest({
    ask: "download",
    urls: urls
  })
}

/** main */
function Downloader(options) {
  for (var i in options) {
    this[i] = options[i]
  }
  this.init()
}

Downloader.prototype = {
  bindClick: function(trigger, node) {
    var self = this
    trigger.addEventListener('click', function() {
      self.urls(node, function(urls) {
        console.assert(urls && urls.forEach, 'urls() 返回的不是数组')

        download(urls)
      })
    }, false)
  },

  insertIcon: function(node) {
    node.insertAdjacentHTML('afterbegin', `
      <div class="one-download">
        <a>download</a>
      </div>
    `.trim())

    var trigger = node.firstChild

    this.bindClick(trigger, node)

    node.oneDownload = this
  },

  update: function() {
    var self = this
    var nodes = [].slice.call(this.queryContainerElements())

    nodes.forEach(function(node) {
      if (!node.oneDownload) {
        self.insertIcon(node)
      }
    })
  },

  // 初始化
  init: function() {
    this.update()
  },

  // 查找容器节点
  queryContainerElements: function() {
    return []
  },

  // 根据容器返回容器所有图片的 URL
  urls: function(container, callback) {
    callback([])
  },

  constructor: Downloader
}

