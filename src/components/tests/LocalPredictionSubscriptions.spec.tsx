

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { LocalPredictionSubscriptions } from '../LocalPredictionSubscriptions'


const MockData = {
  data: {
    error: 'no',
    loading: true,
    allPredictions: false
  }
}

test('<LocalPredictionSubscriptions/> component matches snapshot', () => {
  beforeEach(() => {
    LocalPredictionSubscriptions.propTypes = {
      loading: jest.fn()
    }
    const elR = renderer.create( <LocalPredictionSubscriptions data={MockData.data}/> )
    expect(elR.toJSON()).toMatchSnapshot()
  })
})

