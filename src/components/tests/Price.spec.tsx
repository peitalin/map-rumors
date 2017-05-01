

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import Price from '../Price'


test('<Price price={"123123"}/> component should format string "123123" into dollars', () => {
  const el = shallow( <Price price={'123123'}/> )
  expect(el.text()).toEqual('$123,123')
})

test('<Price price={123123}/> component should format number 123123 into dollars', () => {
  const el = shallow( <Price price={123123}/> )
  expect(el.text()).toEqual('$123,123')
})

test(' component matches snapshot', () => {
  const elR = renderer.create( <Price price={123123}/> )
  expect(elR.toJSON()).toMatchSnapshot()
})

