var downloader = new Downloader({
  queryContainerElements: function() {
    return document.querySelectorAll('.piclist_ul > li')
  },

  async: true,

  startObserve(node) {
    var self = this
    var observer = new MutationObserver(function (mutations) {
      self.update()
    })
    Array.prototype.forEach.call(node.children, function(node){
      observer.observe(node, {
        childList: true
      })
    })
  },

  init: function() {
    var picWrap = document.querySelector('.piclist_wrap')
    if (picWrap) {
      this.startObserve(picWrap)
      return
    }

    var self = this

    var initObserver = new MutationObserver(function (mutations) {
      var picWrap = document.querySelector('.piclist_wrap')
      if (picWrap) {
        initObserver.disconnect()
        self.startObserve(picWrap)
      }
    })

    initObserver.observe(document.body, {
      childList: true
    })
  },

  urls: function(element, callback) {
    var urls = [].map.call(element.querySelectorAll('a.ph_ar_box'), function(a) {
      var pid = a.getAttribute('action-data').match(/pid=([^&]+)/)[1]
      var sinaimgIndex = ~~(Math.random()*4) + 1
      return `http://ww${sinaimgIndex}.sinaimg.cn/large/${pid}.jpg`
    })

    callback(urls)
  }
})