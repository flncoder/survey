// let message
function showMessage (msg) {
  Message.show(msg)
}

// const hideMessagetime = 0

const Message = {
  show: (msg) => {
    // let that = this
    let html = document.createElement('div')
    html.setAttribute('id', 'topN-message')
    html.setAttribute('class', 'topN-message-Bg')
    html.innerHTML = `
      <div class="topN-message-Content-Box">
      ${msg}
      </div>
    `
    // document.getElementsByClassName('wrap')[0].appendChild(html)
    document.getElementById('app').appendChild(html)
  },
  hide: () => {
    let obj = document.getElementById('topN-message')
    if (obj.remove) {
      obj.remove()
    } else {
      obj.removeNode(true)
    }
  }
}

function hideMessage () {
  // loading.close()
  Message.hide()
}

let needMessageCount = 0
const showTopNMessage = function (msg) {
  if (needMessageCount === 0) {
    showMessage(msg)
  }
  needMessageCount++
}

const hideTopNMessage = function () {
  if (needMessageCount <= 0) return
  needMessageCount--
  if (needMessageCount === 0) {
    hideMessage()
  }
}

export {
  showMessage,
  hideMessage,
  showTopNMessage,
  hideTopNMessage
}
