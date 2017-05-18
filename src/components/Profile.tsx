
import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../reducer'
import { userGQL } from '../typings/interfaceDefinitions'

import Title from './Title'


interface DispatchProps {
}
interface StateProps {
  userGQL: userGQL
}
interface ReactProps {
  data?: any
}

export class Profile extends React.Component<StateProps & DispatchProps & ReactProps, any> {
  render() {
    return (
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '5%',
        color: '#f1f1f1',
        backgroundColor: '#222',
        width: '100%'
      }}>
        <b>User Profile:</b>
        <div><b>email:</b> { this.props.userGQL.emailAddress }</div>
        <div><b>name:</b> { this.props.userGQL.name }</div>
        <div><b>id:</b> { this.props.userGQL.id }</div>
        <div><b>upvotes:</b> { this.props.userGQL.upvotes }</div>
        <div><b>downvotes:</b> { this.props.userGQL.downvotes }</div>
        <div><b>cards:</b></div>
        {(
          this.props.userGQL.cards.map((card, i) => {
            return (
              <div key={i} style={{ height: '200px' }}>
                <img style={{ height: '100%' }} src={`https://s3-ap-southeast-2.amazonaws.com/hayekcards/spades_${card}.svg`}>
                </img>
              </div>
            )
          })
        )}
      </div>
    )
  }
}


const mapStateToProps = ( state: ReduxState ): ReduxStateUser => {
  return {
    userGQL: state.reduxUser.userGQL
  }
}

export default connect(mapStateToProps, null)( Profile )

