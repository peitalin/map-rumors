
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

import { iHouse, iGeojson } from '../typings/interfaceDefinitions'
import AddPrediction from './AddPrediction'

import 'styles/HouseStats.scss'


interface HouseStatsProps {
  updateClickedAddress?(address: string): void
  data?: {
    error: any
    loading: boolean
    Geojson: iGeojson
  }
  graphql_id?: string
  houseProps?: {
    LOT: string
    PLAN: string
    CA_AREA_SQM: number
  }
  flipCard: Function
  currentCard: string
  upvotes: number
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
      allGeojsons: [{
        id: '',
        address: '',
        bedrooms: '',
        bathrooms: '',
        carspaces: '',
        lotPlan: '',
        unitNumber: '',
        streetNumber: '',
        streetName: '',
        streetType: '',
        locality: '',
      }
    }]
    houseProps: {
      LOT: '',
      PLAN: '',
      CA_AREA_SQM: 0,
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
            <Row gutter={16}> <Col span={12}>Bedrooms:</Col> </Row>
            <Row gutter={16}> <Col span={12}>Bathrooms:</Col> </Row>
            <Row gutter={16}> <Col span={12}>Carspaces:</Col> </Row>
            <Row gutter={16}> <Col span={12}>Area:</Col> </Row>
            <Row gutter={16}> <Col span={12}>Lot No:</Col> </Row>
            <Row gutter={16}> <Col span={12}>Plan No:</Col> </Row>
          </div>
        </div>
      )
    }

    if (this.props.data.Geojson) {
      let {
        id,
        address,
        lot,
        plan,
        lotPlan,
        unitType,
        unitNumber,
        streetNumber,
        streetName,
        streetType,
        suburb,
      } = this.props.data.Geojson.properties
      let unitStreetNumber = (unitNumber != "None") ? `${unitNumber}/${streetNumber}` : `${streetNumber}`
      return (
        <div>
          <div className="house-stats-heading" onClick={this.props.flipCard}>

            <Row gutter={0}>
              <Col span={24}>
                <h2>{ unitStreetNumber }</h2>
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
              <Col span={12}>{ 2 }</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Bathrooms:</Col>
              <Col span={12}>{ 3 }</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Carspaces:</Col>
              <Col span={12}>{ 2 }</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Area:</Col>
              <Col span={12}>{( `${this.props.houseProps.CA_AREA_SQM} sqm` )}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Lot:</Col>
              <Col span={12}>{ lot }</Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>Plan:</Col>
              <Col span={12}>{ plan }</Col>
            </Row>
          </div>

          <AddPrediction Geojson={this.props.data.Geojson}
            currentCard={this.props.currentCard}
            upvotes={this.props.upvotes}
          />
        </div>
      )
    } else {
      return (
        <div>no HouseStats</div>
      )
    }
  }
}

let query = gql`
query($graphql_id: ID!) {
  Geojson(id: $graphql_id) {
    id
    lngCenter
    latCenter
    properties {
      address
      lot
      plan
      lotPlan
      unitType
      unitNumber
      streetNumber
      streetName
      streetType
      suburb
    }
  }
}
`

let queryOptions = {
  options: (ownProps) => ({
    variables: {
      graphql_id: ownProps.graphql_id
    }
  })
}
export default graphql(query, queryOptions)( HouseStats )

