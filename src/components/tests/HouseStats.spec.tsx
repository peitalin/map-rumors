

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import Title from '../Title'
import * as Loader from 'halogen/DotLoader'
import { HouseStats } from '../HouseStats'

const MockProps = {
  data: {
    error: undefined,
    loading: false,
    House: {
      id: 'test',
      address: 'test',
      bedrooms: 1,
      bathrooms: 2,
      carspaces: 3,
      planNum: 'test',
      lotNum: 'test',
      lotPlan: 'test',
      unitNum: 'test',
      streetNum: 'test',
      streetName: 'test',
      streetType: 'test',
      locality: 'test',
    }
  },
}


test('<HouseStats /> component should contain 1 <h1>', () => {
  const el = shallow( <HouseStats {...MockProps} /> )
  expect(el.find('h2').length).toEqual(3)
})

test('<HouseStats /> component should contain 1 <Title> on error', () => {
  const el = shallow( <HouseStats {...{...MockProps, data: {...MockProps.data, error: true}}} /> )
  expect(el.find(Title).length).toEqual(1)
  expect(el.find('div').text()).toEqual('HouseStats: GraphQL Errored.')
})

test('<HouseStats /> component should contain 1 <Loader> on loading', () => {
  const el = shallow( <HouseStats {...{...MockProps, data: {...MockProps.data, loading: true}}} /> )
  expect(el.find(Loader).length).toEqual(1)
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



