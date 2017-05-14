
import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxStateUser } from '../reducer'
import { userGQL } from '../typings/interfaceDefinitions'



interface DispatchProps {
  updateLngLat?(lngLat: any): Dispatch<A>
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
      <div>
				 ROFILE
      </div>
    )
  }
}


const mapStateToProps = ( state: ReduxStateUser ): ReduxStateUser => {
  return {
    userGQL: state.userGQL
  }
}

export default connect(mapStatetoProps, null)( Profile )

