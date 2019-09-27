import { Component, h, Router } from 'splay'
import Connector from '../connector'
import '@css/components/example.less'
const VIDEO_TIMEOUT = 1000
class Example extends Component {
  launchVideo () {
    window.setTimeout(
      () => Connector.rpc('play', { channelId: 313 }),
      VIDEO_TIMEOUT)
  }

  init () {
    this.data = [
      { icon: 'play', text: 'Lire', onTiemout: this.launchVideo.bind(this) },
      { icon: 'plus', text: 'Ajouter à Ma liste' },
      { icon: 'thumbs-up', text: 'Évaluer ce titre' }
    ]
  }

  get dataToSave () {
    return { data: this.data }
  }

  render () {
    return (
      <div className="example">
        <h1 className="example-title">Star WARS <i className='fas fa-thumbs-up' /></h1>
        <img src="https://via.placeholder.com/400x200" />
        <div className='headband'>
          <span className='suggest'>Suggéré à 79%</span>
          <span className='year'>2022</span>
          <span className='csa'>13+</span>
          <span className='duration'>1h30min</span>
          <span classname='quality'>HD</span>
        </div>
        <div className='synopsis'>
          Dans une tour à Paris, deux laveurs de vitres se chamaillent déjouent
          malgré eux un coup monté pour dérober un puissant tycoon lors d'une
          fausse prise d'otage.
        </div>
        <div className='extra-info'>
          <span>Distribution: Éric Judor, Marina Foïs, Serge Riaboukine</span>
          <span>Réalisateur: Charles Nemes</span>
          <span>Comédies, Comédies françaises</span>
        </div>
        <ul class='menu'>
          {this.data.map(({ icon, text }) =>
            <li className={`menu-item ${this.focusableClass}`}>
              <i className={`fas fa-${icon}`} / >
              <span className='menu-text'>{text}</span>
            </li>)}
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
