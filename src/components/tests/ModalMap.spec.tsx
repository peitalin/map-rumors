

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { ModalMap } from '../ModalMap'
import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'


let MockProps = {
  longitude: 0,
  latitude: 0,
}


test('<ModalMap/> component should contain 1 <Button> to toggle Modal', () => {
  const el = shallow( <ModalMap {...MockProps} /> )
  expect(el.find(Button).length).toEqual(1)
})


test('<ModalMap/> -> <Button> -> <span> should contain text: "Open Modal Map".', () => {
  const el = shallow( <ModalMap {...MockProps} /> )
  expect(el.find(Button).first().childAt(0).text()).toEqual('Open Modal Map')
})


test('<ModalMap/> should contain div: "#modalmap" when visible state is true', () => {
  const el = shallow( <ModalMap {...MockProps} /> )
  expect(el.find('#modalmap').length).toEqual(0)
  el.setProps({ showModal: true })
  expect(el.find('#modalmap').length).toEqual(1)
})



test('<ModalMap/> component should contain 2 <InputNumber> elements for lat and lng', () => {
  const el = shallow( <ModalMap {...MockProps} /> )
  expect(el.find('span').length).toEqual(2)
})


test('<ModalMap/> component matches snapshot', () => {
  const elR = renderer.create( <ModalMap {...MockProps} /> )
  expect(elR.toJSON()).toMatchSnapshot()
})






