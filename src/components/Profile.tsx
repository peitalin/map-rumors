
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
    console.info(this.props.userGQL)
    return (
      <Title>
        <div style={{ color: '#eee' }}>
           PROFILE
           <div>{ this.props.userGQL.emailAddress }</div>
           <div>{ this.props.userGQL.name }</div>
           <div>{ this.props.userGQL.id }</div>
           <div>{ this.props.userGQL.upvotes }</div>
           <div>{ this.props.userGQL.downvotes }</div>
        </div>
      </Title>
    )
  }
}


const mapStateToProps = ( state: ReduxState ): ReduxStateUser => {
  return {
    userGQL: state.reduxUser.userGQL
  }
}

export default connect(mapStateToProps, null)( Profile )

