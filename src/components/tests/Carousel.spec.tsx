

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { Carousel } from '../Carousel'


class CarouselTest extends React.Component<ReactProps, any> {
  render() {
    return (
      <Carousel>
        <div style={{ height: 100, width: 100 }}></div>
        <div style={{ height: 100, width: 100 }}></div>
      </Carousel>
    )
  }
}

test('<Carousel/> component should contain 2 boxes', () => {
  const el = shallow( <CarouselTest/> )
  expect(el.find('div').length).toEqual(2)
})

test('<Carousel/> component matches snapshot', () => {
  const elR = renderer.create( <CarouselTest/> )
  expect(elR.toJSON()).toMatchSnapshot()
})

