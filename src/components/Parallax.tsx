
import * as React from 'react'
import Title from './Title'
import 'styles/Parallax.scss'
import { TweenLite } from 'gsap'



interface ReactProps {
  data?: any
}

export class Parallax extends React.Component<ReactProps, any> {

  state = {}

  componentDidMount() {
    // let d = document.getElementById('parallax__textbox')
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    // let d = document.getElementById('parallax__textbox')
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = (event) => {
    let scrollY = window.scrollY
    // console.info(scrollY)
    // document.getElementById('parallax1').style.transform = `translate3d(0, ${scrollY/2}px, 0)`
    TweenLite.to('#parallax1', 0.1, { y: scrollY/2 })
    TweenLite.to('#GeoSearchBar', 0.1, { y: scrollY/2 })
    TweenLite.to('.mapboxgl-ctrl-top-right', 0.1, { y: scrollY/2 })

    // TweenLite.to('.login-auth0', 0, { y: -scrollY/2 })
    // TweenLite.to('.login-auth0', 0.2, { y: 0 })

    let mapboxContainer = document.getElementById('mapbox__container')
    if (mapboxContainer) {
      mapboxContainer.style.transform = `translate3d(0, ${scrollY/2}px, 0)`
    }
    // must mount route on map/parallax/...
    // otherwise map will be unmounted when route changes

  }

  render() {
    return (
      <div id='parallax__textbox' className="parallax">
        <div className='parallax__spacer'></div>
        <Title>
          <div id='parallax1'></div>
        </Title>
      </div>
    )
  }
}

export default Parallax
