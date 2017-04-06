
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import * as Button from 'antd/lib/button'
import { RadarGraph } from '../Radar'

import { PokemonStats, iPokemon } from '../PokemonStats'



const MockProps = {
  data: {
    Pokemon: {
      name: "Eevee",
      img: 'http://cdn.bulbagarden.net/upload/thumb/e/e2/133Eevee.png/250px-133Eevee.png',
      elementalType: ['normal'],
      skills: ['Tackle', 'Growl'],
      nextEvolution: [{
        name: "Flareon",
        img: "http://cdn.bulbagarden.net/upload/thumb/d/dd/136Flareon.png/250px-136Flareon.png"
      }]
    }
  },
  match: { params: { pname: 'Pichu' } }
}


test('<PokemonStats/> component should contain an image of a pokemon', () => {
  const el = shallow( <PokemonStats {...MockProps} /> )
  expect(el.find('img').length).toEqual(1)
})


test('<PokemonStats/> should contain a <RadarGraph /> component', () => {
  const el = shallow( <PokemonStats {...MockProps} /> )
  expect(el.find(RadarGraph).length).toEqual(1)
})


test('<PokemonStats/> component snapshot test', () => {
  beforeEach(() => {
    PokemonStats.contextTypes = {
      router: ({ transitionTo: jest.fn() })
    }
    const elR = renderer.create( <PokemonStats {...MockProps} /> )
    expect(elR.toJSON()).toMatchSnapshot()
  })
})

