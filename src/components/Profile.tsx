
import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxStateUser } from '../reducer'
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
        </div>
      </Title>
    )
  }
}


const mapStateToProps = ( state: ReduxStateUser ): ReduxStateUser => {
  return {
    userGQL: state.userGQL
  }
}

export default connect(mapStateToProps, null)( Profile )

