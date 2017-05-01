

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import CarouselTile from '../CarouselTile'


test('<CarouselTile /> component should contain 1 .tile__container class', () => {
  const el = shallow( <CarouselTile /> )
  expect(el.find('.tile__container').length).toEqual(1)
})

test('<CarouselTile /> component should contain 1 img', () => {
  const el = shallow( <CarouselTile /> )
  expect(el.find('img').length).toEqual(1)
})

test('<CarouselTile /> component matches snapshot', () => {
  const elR = renderer.create( <CarouselTile /> )
  expect(elR.toJSON()).toMatchSnapshot()
})

const jestSpy = jest.fn()
const cTile = mount(<CarouselTile onClick={ jestSpy }/>)

test('<CarouselTile /> should have a function in its props', () => {
  expect(cTile.props().onClick).toBeDefined()
})

test('<CarouselTile /> Button should be clicked, then clicked twice', () => {
  cTile.find('.tile__container').simulate('click')
  expect(jestSpy).toHaveBeenCalledTimes(1)
  cTile.find('.tile__container').simulate('click')
  cTile.find('.tile__container').simulate('click')
  expect(jestSpy).toHaveBeenCalledTimes(3)
})


