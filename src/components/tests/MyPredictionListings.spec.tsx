



import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { MyPredictionListings } from '../MyPredictionListings'
import { Link } from 'react-router-dom'

import * as Popconfirm from 'antd/lib/popconfirm'


const MockProps = {
  userGQL: {
    predictions: [
      { id: 'prediction#1', prediction: 111, house: { address: '55 Chester Rd' } },
      { id: 'prediction#2', prediction: 222, house: { address: '16 Evergreen Place' } },
      { id: 'prediction#3', prediction: 333, house: { address: '123 Warrigal Rd' } },
    ]
  },
  data: {
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
  isUpdatingPredictions: jest.fn(),
  updateUserProfileRedux: jest.fn(),
  deletePrediction: jest.fn(),
  updateGeoMyPredictions: jest.fn(),
  gotoPredictionLocation: jest.fn(),
}

test('<MyPredictionListings/> should contain 3 <PopConfirm/>', () => {
  beforeEach(() => {
    MyPredictionListings.propTypes = {
      store: jest.fn()
    }
    const el = shallow( <MyPredictionListings {...MockProps} /> )
    expect(el.find(Popconfirm).length).toEqual(3)
  })
})

test('<MyPredictionListings/> should contain 3 <Link>', () => {
  beforeEach(() => {
    MyPredictionListings.propTypes = {
      store: jest.fn()
    }
    const el = shallow( <MyPredictionListings {...MockProps} /> )
    expect(el.find(Link).length).toEqual(3)
  })
})

test('<MyPredictionListings/> should contain 3 <div className="tile__container"/>', () => {
  beforeEach(() => {
    MyPredictionListings.propTypes = {
      store: jest.fn()
    }
    const el = shallow( <MyPredictionListings {...MockProps} /> )
    expect(el.find('.tile__container').length).toEqual(3)
  })
})

