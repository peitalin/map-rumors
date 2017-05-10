
import * as React from 'react'
import 'styles/CardExpander.scss'
import * as classnames from 'classnames'
import { Link } from 'react-router-dom'
import { TweenLite } from 'gsap'

const PREDICTIONLISTINGS_ROUTE = '/map/parallax/mypredictionlistings'


interface DispatchProps {
}

interface StateProps {
}

interface ReactProps {
  data?: any
}


export default class CardExpander extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  state = {
    imgClicked: false,
    infoClicked: false
  }

  componentDidMount() {
    document.getElementsByClassName('card__expander__img')[0].addEventListener('click', this.handleClickImg)
    document.getElementsByClassName('card__expander__info')[0].addEventListener('click', this.handleClickInfo)
    TweenLite.from('.card__container', 0.4, { opacity: 0 })
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

  render() {
    return (
      <div className={classnames({
        "card__container": true,
        "expanded-full": this.state.infoClicked && this.state.imgClicked
      })}>

        <Link to={PREDICTIONLISTINGS_ROUTE}>
          <div className="card__underlay"></div>
        </Link>

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
