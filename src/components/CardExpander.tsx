
import * as React from 'react'
import 'styles/CardExpander.scss'
import * as classnames from 'classnames'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { TweenLite, TweenMax } from 'gsap'

const PREDICTIONLISTINGS_ROUTE = '/map/parallax/mypredictionlistings'


interface DispatchProps {
}

interface StateProps {
}

interface ReactProps {
  data?: any
}


export class CardExpander extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  state = {
    imgClicked: false,
    infoClicked: false,
    underlayClicked: false,
    goBackToRoute: '/map/parallax/mypredictionlistings'
  }

  componentDidMount() {
    document.getElementsByClassName('card__expander__img')[0].addEventListener('click', this.handleClickImg)
    document.getElementsByClassName('card__expander__info')[0].addEventListener('click', this.handleClickInfo)
    TweenLite.from('.card__container', 0.4, { autoAlpha: 0 })
  }

  handleClickImg = (e) => {
    console.info(e)
    this.setState({
      imgClicked: !this.state.imgClicked,
      infoClicked: false
    })
  }

  handleClickInfo = (e) => {
    console.info(e)
    this.setState({
      infoClicked: !this.state.infoClicked
    })
  }

  handleClickUnderlay = (e) => {
    TweenLite.to('.card__container', 0.4, { autoAlpha: 0, height: '0vh' })
    TweenLite.to('.card__underlay', 0.4, { autoAlpha: 0, height: '0vh' })
    TweenLite.to('.card__expander__img', 0.1, { autoAlpha: 0, height: 0, y: -100 })
    TweenLite.to('.card__expander__info', 0.1, { autoAlpha: 0, height: 0, y: -100 })

    setTimeout(() => {
      // 400ms delay before route-change, during which transition animation plays
      this.setState({
        underlayClicked: true
      })
    }, 400)
  }

  render() {
    console.info(this.props)
    return (
      <div className={classnames({
        "card__container": true,
        "expanded-full": this.state.infoClicked && this.state.imgClicked
      })}>

        <div className="card__underlay" onClick={this.handleClickUnderlay}>
          {(
            this.state.underlayClicked &&
            <Redirect to={PREDICTIONLISTINGS_ROUTE}/>
          )}
        </div>

        <img className={classnames({
            "card__expander__img": true,
            "expanded": this.state.imgClicked,
            "expanded-full": this.state.infoClicked && this.state.imgClicked
          })}
          src={require("../../houses/10.jpg")} alt=""
          style={{
        }}/>

        <div className={classnames({
          "card__expander__info": true,
          "expanded": this.state.imgClicked,
          "expanded-full": this.state.infoClicked && this.state.imgClicked
          })} style={{
        }}>
        {(
          !!this.props.data
          ? <div>
              <p> PREDICTION STATS </p>
              <p> { this.props.data.allPredictions[0].house.address }</p>
              <p> { this.props.data.allPredictions[0].user.emailAddress }</p>
              <p> { this.props.data.allPredictions[0].prediction }</p>
              <p>*****</p>
            </div>
          : <div>No Predictions in CardExpander</div>
         )}
        </div>
      </div>
    )
  }
}


export default withRouter( CardExpander )
