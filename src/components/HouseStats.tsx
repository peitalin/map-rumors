
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'


import { SpinnerRectangle, SpinnerDots } from './Spinners'
import Title from './Title'

import * as Card from 'antd/lib/card'
import 'antd/lib/card/style/css'

import * as Row from 'antd/lib/row'
import 'antd/lib/row/style/css'

import * as Col from 'antd/lib/col'
import 'antd/lib/col/style/css'

import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import * as InputNumber from 'antd/lib/input-number'
import 'antd/lib/input-number/style/css'

import { iHouse } from '../typings/interfaceDefinitions'
import AddPrediction from './AddPrediction'

import 'styles/HouseStats.scss'


interface HouseStatsProps {
  updateClickedAddress?(address: string): void
  data?: {
    error: any
    loading: boolean
    House: iHouse
  }
  lotPlan?: string
  updateClickedAddress?(): void
  houseProps?: {
    LOT: string
    PLAN: string
    LOT_AREA: number
  }
  flipCard: Function
}

interface HouseStatsState {
  bid: number
}



export class HouseStats extends React.Component<HouseStatsProps, HouseStatsState> {

  state = {
    bid: 550000,
  }

  static defaultProps = {
    data: {
      House: {
        id: '',
        address: '',
        bedrooms: '',
        bathrooms: '',
        carspaces: '',
        planNum: '',
        lotNum: '',
        lotPlan: '',
        unitNum: '',
        streetNum: '',
        streetName: '',
        streetType: '',
        locality: '',
      }
    }
    houseProps: {
      LOT: '',
      PLAN: '',
      LOT_AREA: 0,
    }
  }

  render() {
    if (this.props.data.error) {
      return <Title><div onClick={this.props.flipCard}>HouseStats: GraphQL Errored.</div></Title>
    }

    if (this.props.data.loading) {
      return (
        <div>
          <div className='house-stats-heading' onClick={this.props.flipCard}>

            <Row gutter={0}>
              <Col span={24}>
                <div className='house-stats-heading house-stats-loader'>
                  <SpinnerRectangle height='66px' width='8px' dark/>
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>Bedrooms:</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Bathrooms:</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Carspaces:</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Area:</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Plan No:</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Lot No:</Col>
            </Row>
          </div>
          <AddPrediction data={this.props.data} />
        </div>
      )
    }

    if (this.props.data.House) {
      let {
        id,
        address,
        bedrooms,
        bathrooms,
        carspaces,
        planNum,
        lotNum,
        lotPlan,
        unitNum,
        streetNum,
        streetName,
        streetType,
        locality,
      } = this.props.data.House
      let unitStreetNum = unitNum ? `${unitNum}/${streetNum}` : `${streetNum}`
      return (
        <div>
          <div className="house-stats-heading" onClick={this.props.flipCard}>

            <Row gutter={0}>
              <Col span={24}>
                <h2>{ unitStreetNum }</h2>
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={24}>
                <h2>{ streetName }</h2>
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={24}>
                <div className="house-stats-heading"><h2>{ streetType }</h2></div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>Bedrooms:</Col>
              <Col span={12}>{ bedrooms }</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Bathrooms:</Col>
              <Col span={12}>{ bathrooms }</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Carspaces:</Col>
              <Col span={12}>{ carspaces }</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Area:</Col>
              <Col span={12}>{(`${this.props.houseProps.LOT_AREA} sqm`)}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Plan No:</Col>
              <Col span={12}>{ planNum }</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Lot No:</Col>
              <Col span={12}>{ lotNum }</Col>
            </Row>
          </div>

          <AddPrediction data={this.props.data} />
        </div>
      )
    } else if (!this.props.data.House) {
      return (
        <div>no HouseStats</div>
      )
    }
  }
}

let query = gql`
query($lotPlan: String!) {
  House(lotPlan: $lotPlan) {
    id
    address
    bedrooms
    bathrooms
    carspaces
    planNum
    lotNum
    unitNum
    streetNum
    streetName
    streetType
    locality
    lotPlan
    lng
    lat
  }
}
`

let queryOptions = {
  options:  (ownProps) => ({
    variables: {
      lotPlan: ownProps.lotPlan
    }
  })
}
export default graphql(query, queryOptions)( HouseStats )

