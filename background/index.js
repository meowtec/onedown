chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  if (request.ask === 'download') {
    request.urls.forEach(function(url) {
      chrome.downloads.download({
        url: url
      })
    })
  }
})