
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { Navbar } from '../Navbar'
import { withRouter } from 'react-router-dom'

import * as Breadcrumb from 'antd/lib/breadcrumb'
import 'antd/lib/breadcrumb/style/css'


const MockLocation = {
  pathname: '/test/route',
  search: 'test',
  hash: 'testhash',
}


test('Navbar.getRouterPath() static method splits router paths', () => {
  expect(Navbar.getRouterPath('/test/route/path', 1)).toEqual('/test')
})

test('Navbar.getRouterPath() static method splits router paths', () => {
  expect(Navbar.getRouterPath('/test/route/path', 2)).toEqual('/test/route')
})

test('Navbar.getRouterPath() static method splits router paths', () => {
  expect(Navbar.getRouterPath('/test/route/path', 3)).toEqual('/test/route/path')
})


test('<Navbar /> component should contain 1 <Breadcrumb/>', () => {
  beforeEach(() => {
    Navbar.contextTypes = {
      location: jest.fn()
    }
    const el = shallow( <Navbar/> )
    expect(el.find(<Breadcrumb/>).length).toEqual(1)
  })
})





