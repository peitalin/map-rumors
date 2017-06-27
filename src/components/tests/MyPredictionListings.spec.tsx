



import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { MyPredictionListings } from '../MyPredictionListings'
import { Link } from 'react-router-dom'
import Title from '../Title'

import * as Popconfirm from 'antd/lib/popconfirm'


const MockProps = {
  userGQL: {
    predictions: [
      {
        id: 'prediction1',
        prediction: 111111,
        geojson: {
          properties: {
            unitNumber: '',
            unitNumber: '',
            streetNumber: '',
            streetName: '',
            streetType: '',
            lotPlan: '',
            address: '44 Chester rd'
          }
        }
      }
      {
        id: 'prediction2',
        prediction: 2222222,
        geojson: {
          properties: {
            unitNumber: '',
            unitNumber: '',
            streetNumber: '',
            streetName: '',
            streetType: '',
            lotPlan: '',
            address: '22 Evergreen rd'
          }
        }
      }
      {
        id: 'prediction3',
        prediction: 333333,
        geojson: {
          properties: {
            unitNumber: '',
            unitNumber: '',
            streetNumber: '',
            streetName: '',
            streetType: '',
            lotPlan: '',
            address: '33 Warrigal rd'
          }
        }
      }
    ]
  },
  isUpdatingPredictions: jest.fn(),
  updateUserProfileRedux: jest.fn(),
  deletePrediction: jest.fn(),
  updateGeoMyPredictions: jest.fn(),
  gotoPredictionLocation: jest.fn(),
}

// https://github.com/mapbox/mapbox-gl-js/issues/3436

test('<MyPredictionListings /> component should contain 1 <Title> on error', () => {
  const el = shallow( <MyPredictionListings {...{...MockProps, userGQL: undefined }} /> )
  expect(el.find(Title).length).toEqual(1)
  expect(el.find('div').text()).toEqual('No User. Log In.')
})

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

