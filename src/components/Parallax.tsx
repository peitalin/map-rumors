
import * as React from 'react'
import Title from './Title'
import 'styles/Parallax.scss'



interface ReactProps {
  data?: any
}

export class Parallax extends React.Component<ReactProps, any> {

  state = {}

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = (event) => {
    let scrollY = window.scrollY
    // console.info(scrollY)
    document.getElementById('parallax1').style.transform = `translate3d(0, ${scrollY/3}px, 0)`
    document.getElementById('parallax2').style.transform = `translate3d(0, ${scrollY/2.5}px, 0)`
    // document.getElementById('map__subscriptions').style.transform = `translate3d(0, ${scrollY/1.5}px, 0)`
    document.getElementById('mapbox__container').style.transform = `translate3d(0, ${scrollY/2}px, 0)`
    // must mount route on map/parallax/...
    // otherwise map will be unmounted when route changes
  }

  render() {
    return (
      <div id='parallax__textbox' className="parallax">
        <div className='parallax__spacer'></div>
        <Title>
          <div id='parallax1'><h1>parallax test</h1></div>
          <div id='parallax2'>Adipisicing quo eaque aut voluptatum autem, ullam quo nulla Debitis ab iure hic voluptas ea. Explicabo aperiam tenetur pariatur temporibus aliquam Totam explicabo iusto illum nulla ducimus ex. Accusantium nihil</div>
          <div id='parallax3'>Adipisicing quo eaque aut voluptatum autem, ullam quo nulla Debitis ab iure hic voluptas ea. Explicabo aperiam tenetur pariatur temporibus aliquam Totam explicabo iusto illum nulla ducimus ex. Accusantium nihil</div>
        </Title>
      </div>
    )
  }
}

export default Parallax
