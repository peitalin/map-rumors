

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import Evolutions from '../Evolutions'
import * as Card from 'antd/lib/card'

let mockData = {
  "Pokemon": {
    "nextEvolution": [
      {
        "name": "Blastoise",
        "img": "https://s3-ap-southeast-2.amazonaws.com/pokedexbucket/pokedex_imgs/blastoise.png"
      }
    ],
    "prevEvolution": [
      {
        "name": "Squirtle",
        "img": "https://s3-ap-southeast-2.amazonaws.com/pokedexbucket/pokedex_imgs/squirtle.png"
      }
    ]
  }
}

test('<Evolutions /> component should contain 1 image', () => {
  const el = shallow( <Evolutions nextEvolution={mockData.Pokemon.nextEvolution} /> )
  expect(el.find('img').length).toEqual(1)
})

test('<Evolutions nextEvolution={}/> should return nextEvolution Card', () => {
  const el = shallow(
    <Evolutions nextEvolution={mockData.Pokemon.nextEvolution} />
  )
  expect(el.find(Card).length).toEqual(1)
})

test('<Evolutions prevEvolution={}/> should return prevEvolution Card', () => {
  const el = shallow(
    <Evolutions prevEvolution={mockData.Pokemon.prevEvolution} />
  )
  expect(el.find(Card).length).toEqual(1)
})


test('<Evolutions prevEvolution={} nextEvolution={}/> should return 2 Cards', () => {
  const el = shallow(
    <Evolutions
      prevEvolution={mockData.Pokemon.prevEvolution}
      nextEvolution={mockData.Pokemon.nextEvolution}
    />
  )
  expect(el.find(Card).length).toEqual(2)
})

test('<Evolutions /> component should retain snapshot', () => {
  beforeEach(() => {
    Evolutions.contextTypes = {
      router: () => ({ transitionTo: jest.fn() })
    }
    const elR = renderer.create( <Evolutions prevEvolution={mockData.Pokemon.prevEvolution} /> )
    expect(elR.toJSON()).toMatchSnapshot()
  })
})

