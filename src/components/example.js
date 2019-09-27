import { Component, h, Router } from 'splay'
import Connector from '../connector'
import '@css/components/example.less'
const VIDEO_TIMEOUT = 1000
class Example extends Component {
  launchVideo () {
    console.log('launchVideo called')
    this.timeout = window.setTimeout(
      () => Connector.rpc('play', { channelId: 313 }, (a, b) => console.log(a, b)),
      VIDEO_TIMEOUT)
  }

  init () {
    this.data = [
      { icon: 'play', text: 'Lire', onTiemout: this.launchVideo.bind(this) },
      { icon: 'plus', text: 'Ajouter aux favori' }
    ]
  }

  get dataToSave () {
    return { data: this.data }
  }

  getList () {
    const arr = []
    for (let i = 0, lgt = this.data.length; i < lgt; i++) {
      arr.push(
        <div className={['example-element', this.focusableClass]}>{this.data[i].text}</div>
      )
    }
    return arr
  }

  render () {
    return (
      <div className="example">
        <h1 className="example-title">Star WARS</h1>
        <i>Use keys Up and Down to select an entry, then use Enter !</i>
        <ul class='menu'>
          {this.data.map(({ icon, text }) =>
            <li class={`menu-item ${this.focusableClass}`}>
              <i class={`fas fa-${icon}`}></i>
              <span class='menu-text'>{text}</span>
            </li>
          )}
        </ul>
      </div>
    )
  }

  // Hooks
  mounted () {
    this.focus(this.current)
    this.checkTimeout()
  }

  checkTimeout () {
    Connector.rpc('stop')
    const item = this.data[this.current]
    if (item.onTiemout) item.onTiemout()
  }
  // Keys

  onKeyUp () {
    if (this.current === 0) return
    const next = this.current - 1
    this.focus(next)
    this.checkTimeout()
  }

  onKeyDown () {
    const max = this.data.length
    const next = this.current + 1
    if (next === max) return
    this.focus(next)
    this.checkTimeout()
  }

  onKeyEnter () {
    if (this.data[this.current]) return Router.navigate('detail', { data: this.data[this.current] })
  }
}

export default Example
