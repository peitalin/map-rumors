



import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { PredictionListings } from '../PredictionListings'
import { Link } from 'react-router-dom'

import * as Popconfirm from 'antd/lib/popconfirm'
import 'antd/lib/popconfirm/style/css'


const MockProps = {
  data: {
    loading: false,
    error: undefined,
    user: {
      id: 'userid',
      name: 'Leo Tolstoy',
      predictions: [
        { id: 'prediction#1', prediction: 111, house: { address: '55 Chester Rd' } },
        { id: 'prediction#2', prediction: 222, house: { address: '16 Evergreen Place' } },
        { id: 'prediction#3', prediction: 333, house: { address: '123 Warrigal Rd' } },
      ]
    }
  }
  longitude: 0,
  latitude: 0,
  isLoading: jest.fn(),
  updateUserProfileRedux: jest.fn(),
  deletePrediction: jest.fn(),
}

test('<PredictionListings/> should contain 3 <Link>', () => {
  beforeEach(() => {
    PredictionListings.propTypes = {
      store: jest.fn()
    }
    const el = shallow( <PredictionListings {...MockProps} /> )
    expect(el.find(Link).length).toEqual(3)
  })
})

// test('<PredictionListings/> should contain 3 <div className="tile"/>', () => {
//   beforeEach(() => {
//     PredictionListings.propTypes = {
//       store: jest.fn()
//     }
//     const el = shallow( <PredictionListings {...MockProps} /> )
//     expect(el.find('.tile').length).toEqual(3)
//   })
// })

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

