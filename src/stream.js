export default class Stream {
  constructor(url) {
    console.log('url:' + url)
    this.url = url
    this.websocket = null
  }

  test() {
    console.log('test stream')
  }
}

