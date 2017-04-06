
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { AddPokemon } from '../AddPokemon'

import * as Button from 'antd/lib/button'


const MockProps = {
  userGQL: {
    id: 'userid',
    name: 'Ash Ketchum',
    bids: [
      { id: 'bid#1', bid: 111, pokemon: { name: 'Raichu' } },
      { id: 'bid#1', bid: 111, pokemon: { name: 'Pichu' } },
      { id: 'bid#1', bid: 111, pokemon: { name: 'Pikachu' } },
    ]
  }
}


test('<AddPokemon /> contains 1 <Button/> when less than 6 pokemons in user profile', () => {
  const el = shallow( <AddPokemon {...MockProps} /> )
  expect(el.find(Button).length).toEqual(1)
})


test('<AddPokemon /> component matches snapshot', () => {
  beforeEach(() => {
    AddPokemon.propTypes = {
      store: jest.fn(),

    }
    const elR = renderer.create( <AddPokemon {...MockProps} /> )
    expect(elR.toJSON()).toMatchSnapshot()
  })

})

