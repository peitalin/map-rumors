
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { SearchBar } from '../SearchBar.tsx'

import * as AutoComplete from 'antd/lib/auto-complete'


const mockData = {
  error: undefined,
  loading: false,
  allPokemons: [
    { name: 'Raichu', elementalType: ['Electric'] },
    { name: 'Pidgey', elementalType: ['Flying', 'Normal'] },
    { name: 'Vulpix', elementalType: ['Fire'] },
    { name: 'Eevee', elementalType: ['Normal'] }
  ]
}

test('<SearchBar/> component should contain 2 AutoComplete input boxes', () => {
  const el = shallow( <SearchBar data={mockData} /> )
  expect(el.find(AutoComplete).length).toEqual(2)
})

test('<SearchBar/> component should match snapshot', () => {
  beforeEach(() => {
    Pokedex.contextTypes = {
      router: () => ({ transitionTo: jest.fn() })
    }
    const searchR = renderer.create( <SearchBar data={mockData}  /> )
    expect(searchR.toJSON()).toMatchSnapshot()
  })

})

