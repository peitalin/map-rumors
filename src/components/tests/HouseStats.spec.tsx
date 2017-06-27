

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import Title from '../Title'
import { SpinnerRectangle } from '../Spinners'
import { HouseStats } from '../HouseStats'

import * as Row from 'antd/lib/row'

const MockProps = {
  data: {
    error: undefined,
    loading: false,
    Geojson: {
      id: '',
      lngCenter: '',
      latCenter: '',
      type: '',
      properties {
        address: '',
        lot: '',
        plan: '',
        lotPlan: '',
        unitType: '',
        unitNumber: '',
        streetNumber: '',
        streetName: '',
        streetType: '',
        suburb: '',
      }
      geometry {
        coordinates: [[0, 0]]
        type: "MultiPolygon"
      }
    }
  },
  houseProps: {
    LOT: '',
    PLAN: '',
    CA_AREA_SQM: 0,
  }
}

test('<HouseStats /> component should contain 1 <h2>', () => {
  const el = shallow( <HouseStats {...MockProps} /> )
  expect(el.find('h2').length).toEqual(3)
})

test('<HouseStats /> component should contain 9 <Row>', () => {
  const el = shallow( <HouseStats {...MockProps} /> )
  expect(el.find(Row).length).toEqual(9)
})

test('<HouseStats /> component should contain 1 <Title> on error', () => {
  const el = shallow( <HouseStats {...{...MockProps, data: {...MockProps.data, error: true}}} /> )
  expect(el.find(Title).length).toEqual(1)
  expect(el.find('div').text()).toEqual('HouseStats: GraphQL Errored.')
})

test('<HouseStats /> component should contain 1 <Loader> on loading', () => {
  const el = shallow( <HouseStats {...{...MockProps, data: {...MockProps.data, loading: true}}} /> )
  expect(el.find(SpinnerRectangle).length).toEqual(1)
})

test('<HouseStats /> component matches snapshot', () => {
  beforeEach(() => {
    HouseStats.contextTypes = {
      store: jest.fn()
    }
    const elR = renderer.create( <HouseStats {...MockProps}/> )
    expect(elR.toJSON()).toMatchSnapshot()
  })
})



