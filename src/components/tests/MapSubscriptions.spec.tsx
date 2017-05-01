

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { MapSubscriptions } from '../MapSubscriptions'


const MockData = {
  data: {
    error: 'no',
    loading: true,
    allPredictions: false
  }
}

// test('<MapSubscriptions/> component matches snapshot', () => {
//   beforeEach(() => {
//     MapSub.propTypes = {
//       loading: jest.fn()
//     }
//     const elR = renderer.create( <MapSubscriptions data={MockData.data}/> )
//     expect(elR.toJSON()).toMatchSnapshot()
//   })
// })
//
