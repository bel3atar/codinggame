import { Component, h, Router } from 'splay'
import '@css/components/example.less'
// const VIDEO_TIMEOUT = 1000
class Example extends Component {
  // launchVideo () {
  //   window.setTimeout(
  //     () => Connector.rpc('play', { channelId: 313 }),
  //     VIDEO_TIMEOUT)
  // }

  init () {
    this.data = [
      { icon: 'play', text: 'Lecture' },
      { icon: 'th-large', text: 'Titres similaires' },
      { icon: 'closed-captioning', text: 'Audio et sous-titres' },
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
        <h1 className="logo"><img src='http://loodibee.com/wp-content/uploads/Star-Wars-transparent-logo.png'/></h1>
        <div className='section-info headband'>
          <span className='suggest'>Suggéré à 79%</span>
          <span className='year'>2017</span>
          <span className='csa'>13+</span>
          <span className='duration'>2h32min</span>
          <span className='quality'>HD</span>
        </div>
        <div className='section-info synopsis'>
        Luke Skywalker's peaceful and solitary existence gets upended when he encounters Rey, a young woman who shows strong signs of the Force. Her desire to learn the ways of the Jedi forces Luke to make a decision that changes their lives forever.
        </div>
        <div className='section-info extra-info'>
          <p><span className="label">Distribution:</span> Daisy Ridley, John Boyega, </p>
          <p><span className="label">Réalisateur:</span> Rian Johnson</p>
          <p>Science-Fiction</p>
        </div>
        <ul className='menu'>
          {this.data.map(({ icon, text }) =>
            <li className={`menu-item ${this.focusableClass}`}>
              <i className={`fas fa-${icon}`} />
              <span className='menu-text'>{text}</span>
            </li>
          )}
          {(this.selector = <li className='menu-item-selector'/>)}
        </ul>
      </div>
    )
  }

  // Hooks
  mounted () {
    this.focus(this.current)
    this.checkTimeout()
    this.timeout = setTimeout(() => {
      const app = document.getElementById('app')
      app.classList.add('transparent')
    }, 2000)
  }

  checkTimeout () {
    const item = this.data[this.current]
    if (item.onTiemout) item.onTiemout()
    clearTimeout(this.timeout)
    document.getElementById('app').classList.remove('transparent')
    this.moveSelector(this.current)
  }
  // Keys

  onKeyUp () {
    if (this.current === 0) return
    const next = this.current - 1
    this.focus(next)
    this.checkTimeout()
    if (next === 0) {
      this.timeout = setTimeout(() => {
        const app = document.getElementById('app')
        app.classList.add('transparent')
      }, 3000)
    }
  }

  onKeyDown () {
    const max = this.data.length
    const next = this.current + 1
    if (next === max) return
    this.focus(next)
    clearTimeout(this.timeout)
    this.checkTimeout()
  }

  moveSelector (value) {
    this.selector.style.transform = `translateY(${value * 48}px)`
  }

  onKeyEnter () {
    if (this.data[this.current]) return Router.navigate('detail', { data: this.data[this.current] })
  }
}

export default Example
