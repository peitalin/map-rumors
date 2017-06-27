
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { AddPrediction } from '../AddPrediction'

import * as Button from 'antd/lib/button'



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


test('<AddPrediction /> contains 1 <Button/> when less than 100 predictions in user profile', () => {
  const el = shallow( <AddPrediction {...MockProps} /> )
  expect(el.find(Button).length).toEqual(1)
})


test('<AddPrediction /> component matches snapshot', () => {
  beforeEach(() => {
    AddPrediction.propTypes = {
      store: jest.fn(),
    }
    const elR = renderer.create( <AddPrediction {...MockProps} /> )
    expect(elR.toJSON()).toMatchSnapshot()
  })
})

