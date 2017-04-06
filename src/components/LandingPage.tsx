

import * as React from 'react'
import Title from './Title'
import * as mojs from 'mo-js'

import 'styles/LandingPage.scss'
import WorldMap from './WorldMap'
import Subscriptions from './Subscriptions'



const burst = new mojs.Burst({
  left: 0, top: 0,
  radius:   { 4: 19 },
  angle:    45,
  children: {
    shape: 'line',
    radius: 3,
    scale: 1,
    stroke: '#FD7932',
    strokeDasharray: '100%',
    strokeDashoffset: { '-100%' : '100%' },
    duration: 700,
    easing: 'quad.out',
  }
})



class LandingPage extends React.Component<any, any> {

  state = {}

  componentDidMount() {
    document.addEventListener('click', (e) => {
      burst.tune({
        x: e.pageX,
        y: e.pageY,
      }).replay()
      // burst animation
    })

    var scaleCurve = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
    var elSpan = document.getElementById('mojs-thumbs-up')
    // mo.js timeline obj
    var timeline = new mojs.Timeline(),

    // tweens for the animation:

    // burst animation
    tween1 = new mojs.Burst({
      parent: elSpan,
      duration: 1500,
      shape : 'circle',
      fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
      opacity: 0.6,
      childOptions: { radius: {20:0} },
      radius: {40:120},
      count: 6,
      isSwirl: true,
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
    }),
    // ring animation
    tween2 = new mojs.Transit({
      parent: elSpan,
      duration: 750,
      type: 'circle',
      radius: {0: 50},
      fill: 'transparent',
      stroke: '#988ADE',
      strokeWidth: {15:0},
      opacity: 0.6,
      easing: mojs.easing.bezier(0, 1, 0.5, 1)
    }),
    // icon scale animation
    tween3 = new mojs.Tween({
      duration : 900,
      onUpdate: function(progress) {
        var scaleProgress = scaleCurve(progress);
        elSpan.style.WebkitTransform = elSpan.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
      }
    });

    // add tweens to timeline:
    timeline.add(tween1, tween2, tween3);
    // when clicking the button start the timeline/animation:
    elSpan.addEventListener('click', function() {
      timeline.replay();
    });

  }



  render() {
    return (
      <div>
        <Title>
          <div className='LandingPage'>
            <div className='heading'><h1>Arrow</h1></div>
            <WorldMap/>
            <div className='heading2'>Safe, Simple, and Social Markets for Real-Estate Predictions</div>
          </div>

          <span id="mojs-thumbs-up" className="fa fa-thumbs-up"></span>

          {/* <img id="" style={{ width: '50vw' }} src={require("../img/house1.svg")} /> */}
          {/* <img id="" src={require("../img/A-Frame.png")} /> */}

        </Title>

      </div>
    )
  }
}



export default LandingPage
