
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { Nav } from '../Nav'
import { withRouter } from 'react-router-dom'

import * as Breadcrumb from 'antd/lib/breadcrumb'
import 'antd/lib/breadcrumb/style/css'


const MockLocation = {
  pathname: '/test/route',
  search: 'test',
  hash: 'testhash',
}


test('Nav.getRouterPath() static method splits router paths', () => {
  expect(Nav.getRouterPath('/test/route/path', 1)).toEqual('/test')
})

test('Nav.getRouterPath() static method splits router paths', () => {
  expect(Nav.getRouterPath('/test/route/path', 2)).toEqual('/test/route')
})

test('Nav.getRouterPath() static method splits router paths', () => {
  expect(Nav.getRouterPath('/test/route/path', 3)).toEqual('/test/route/path')
})


test('<Nav /> component should contain 1 <Breadcrumb/>', () => {
  beforeEach(() => {
    Nav.contextTypes = {
      location: jest.fn()
    }
    const el = shallow( <Nav/> )
    expect(el.find(<Breadcrumb/>).length).toEqual(1)
  })
})





