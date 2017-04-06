


import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import Title from '../Title'



test(' component matches snapshot', () => {
  const elR = renderer.create( <Title /> )
  expect(elR.toJSON()).toMatchSnapshot()
})

