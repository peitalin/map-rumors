



import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { PredictionListings } from '../PredictionListings'
import { Link } from 'react-router-dom'

import * as Popconfirm from 'antd/lib/popconfirm'
import 'antd/lib/popconfirm/style/css'

import * as Tabs from 'antd/lib/tabs'
import 'antd/lib/tabs/style/css'
const TabPane = Tabs.TabPane


const MockProps = {
  userGQL: {
    id: 'userid',
    name: 'Leo Tolstoy',
    predictions: [
      { id: 'prediction#1', prediction: 111, house: { address: '55 Chester Rd' } },
      { id: 'prediction#2', prediction: 222, house: { address: '16 Evergreen Place' } },
      { id: 'prediction#3', prediction: 333, house: { address: '123 Warrigal Rd' } },
    ]
  },
  data: {
    loading: false,
    error: undefined,
  }
  longitude: 0,
  latitude: 0,
  isLoading: jest.fn(),
  updateUserProfileRedux: jest.fn(),
  deletePrediction: jest.fn(),
}


// test('<PredictionListings/> component should contain 1 <h1> with "Listings"', () => {
//   beforeEach(() => {
//     PredictionListings.propTypes = {
//       store: jest.fn()
//     }
//     const el = shallow( <PredictionListings {...MockProps} /> )
//     expect(el.find('h1').length).toEqual(1)
//     expect(el.find('h1').text()).toEqual("Listings")
//   })
// })


test('<PredictionListings/>should contain 3 <Link>', () => {
  beforeEach(() => {
    PredictionListings.propTypes = {
      store: jest.fn()
    }
    const el = shallow( <PredictionListings {...MockProps} /> )
    expect(el.find(Link).length).toEqual(3)
  })
})

test('<PredictionListings/> should contain 3 <TabPane>', () => {
  beforeEach(() => {
    PredictionListings.propTypes = {
      store: jest.fn()
    }
    const el = shallow( <PredictionListings {...MockProps} /> )
    expect(el.find(TabPane).length).toEqual(3)
  })
})

test('<PredictionListings/> should contain 3 <Popconfirm>', () => {
  beforeEach(() => {
    PredictionListings.propTypes = {
      store: jest.fn()
    }
    const el = shallow( <PredictionListings {...MockProps} /> )
    expect(el.find(Popconfirm).length).toEqual(3)
  })
})

test('<PredictionListings/> component matches snapshot', () => {
  beforeEach(() => {
    PredictionListings.propTypes = {
      store: jest.fn()
    }
    const elR = renderer.create( <PredictionListings {...MockProps} /> )
    expect(elR.toJSON()).toMatchSnapshot()
  })
})

