
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { LoginAuth0 } from '../LoginAuth0'
import * as Button from 'antd/lib/button'


const mockData = {
  loading: false
  user: {'id': 'test_test_test'}
}


const MockProps = {
  clientId: 'test',
  domain: 'test',
  data: {
    loading: false,
    user: { 'id': 'mock ID #1234' }
  }
  updateUserProfileRedux: jest.fn()
}

test('<LoginAuth0 /> component should contain button', () => {
  beforeEach(() => {
    LoginAuth0.contextTypes = {
      router: jest.fn()
    }
    const el = shallow(
      <LoginAuth0 {...MockProps} />
    )
    expect(el.find(Button).length).toEqual(1)
  })
})


test('<LoginAuth0 /> component should render snapshot', () => {
  beforeEach(() => {
    LoginAuth0.contextTypes = {
      router: jest.fn()
    }
    const elR = renderer.create(
      <LoginAuth0 {...MockProps} />
    )
    expect(elR.toJSON()).toMatchSnapshot()
  })
})


