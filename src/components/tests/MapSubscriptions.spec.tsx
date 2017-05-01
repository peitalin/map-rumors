

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { MapSubscriptions } from '../MapSubscriptions'


test('<MapSubscriptions/> component matches snapshot', () => {
  beforeEach(() => {
    MapSub.propTypes = {
      loading: jest.fn()
    }
    const elR = renderer.create( <MapSubscriptions/> )
    expect(elR.toJSON()).toMatchSnapshot()
  })
})

