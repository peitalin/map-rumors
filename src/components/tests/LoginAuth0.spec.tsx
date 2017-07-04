
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { LoginAuth0 } from '../LoginAuth0'
import { SpinnerRectangle } from '../Spinners'



const MockProps = {
  clientId: 'test',
  domain: 'test',
  data: {
    loading: false,
    user: { 'id': 'mock ID #1234' }
  }
  updateUserProfileRedux: jest.fn()
}
const newMockProps = {...MockProps, data: { ...MockProps.data, loading: true }}


test('<LoginAuth0 /> component should contain button', () => {
  const el = shallow( <LoginAuth0 {...MockProps} />)
  expect(el.find('button').length).toEqual(1)
})


test('<LoginAuth0 /> component should render snapshot', () => {
  const elR = renderer.create(
    <LoginAuth0 {...MockProps} />
  )
  expect(elR.toJSON()).toMatchSnapshot()
})

test('<LoginAuth0 /> loading button should have class: ".spinner-rectangle"', () => {
  const el = mount(
    <LoginAuth0  {...newMockProps} />
  )
  expect(el.find('.spinner-rectangle').length).toEqual(1)
})

test('<LoginAuth0 /> loading button should have spinning loader: <SpinnerRectangle />', () => {
  const elN = shallow(
    <LoginAuth0  {...newMockProps} />
  )
  expect(elN.find('button').childAt(0).text()).toEqual("<SpinnerRectangle />")
})

test('<LoginAuth0 /> button should have text: "Login" when loading == false, and not logged in', () => {
  beforeEach(() => {
    LoginAuth0.contextTypes = {
      router: jest.fn()
    }
    const el = shallow(
      <LoginAuth0 {...MockProps} />
    )
    expect(el.find('button').first().childAt(0).text()).toEqual('Login')
  })
})

