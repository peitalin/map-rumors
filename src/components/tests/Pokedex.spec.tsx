


import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { Pokedex } from '../Pokedex'


const pokedex = shallow( <Pokedex /> )


test('<Pokedex /> has a form', () => {
  expect(pokedex.find('fieldset').length).toEqual(1)
  expect(pokedex.find('form').length).toEqual(1)
})

test('<Pokedex /> renders legend "Pokedex"', () => {
  expect(pokedex.find('legend').text()).toEqual('Pokedex')
})


test('<input className="f3" /> has className "f3"', () => {
  pokedex.find('input').last().hasClass('f3')
})


test('<Pokedex /> component', () => {
  beforeEach(() => {
    Pokedex.contextTypes = {
      router: () => ({ transitionTo: jest.fn() })
    }
    const listR = renderer.create( <Pokedex /> )
    expect(listR.toJSON()).toMatchSnapshot()
  })
})

