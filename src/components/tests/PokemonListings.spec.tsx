


import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { PokemonListings } from '../PokemonListings'
import { Link } from 'react-router-dom'

import * as Popconfirm from 'antd/lib/popconfirm'
import 'antd/lib/popconfirm/style/css'

import * as Tabs from 'antd/lib/tabs'
import 'antd/lib/tabs/style/css'
const TabPane = Tabs.TabPane


const MockProps = {
  userGQL: {
    id: 'userid',
    name: 'Ash Ketchum',
    bids: [
      { id: 'bid#1', bid: 111, pokemon: { name: 'Raichu' } },
      { id: 'bid#1', bid: 111, pokemon: { name: 'Pichu' } },
      { id: 'bid#1', bid: 111, pokemon: { name: 'Pikachu' } },
    ]
  },
  longitude: 0,
  latitude: 0,
  isLoading: jest.fn(),
  updateUserProfileRedux: jest.fn(),
  deleteBid: jest.fn(),
}


// test('<PokemonListings/> component should contain 1 <h1> with "Listings"', () => {
//   beforeEach(() => {
//     PokemonListings.propTypes = {
//       store: jest.fn()
//     }
//     const el = shallow( <PokemonListings {...MockProps} /> )
//     expect(el.find('h1').length).toEqual(1)
//     expect(el.find('h1').text()).toEqual("Listings")
//   })
// })


test('<PokemonListings/>should contain 3 <Link>', () => {
  beforeEach(() => {
    PokemonListings.propTypes = {
      store: jest.fn()
    }
    const el = shallow( <PokemonListings {...MockProps} /> )
    expect(el.find(Link).length).toEqual(3)
  })
})

test('<PokemonListings/> should contain 3 <TabPane>', () => {
  beforeEach(() => {
    PokemonListings.propTypes = {
      store: jest.fn()
    }
    const el = shallow( <PokemonListings {...MockProps} /> )
    expect(el.find(TabPane).length).toEqual(3)
  })
})

test('<PokemonListings/> should contain 3 <Popconfirm>', () => {
  beforeEach(() => {
    PokemonListings.propTypes = {
      store: jest.fn()
    }
    const el = shallow( <PokemonListings {...MockProps} /> )
    expect(el.find(Popconfirm).length).toEqual(3)
  })
})

test('<PokemonListings/> component matches snapshot', () => {
  beforeEach(() => {
    PokemonListings.propTypes = {
      store: jest.fn()
    }
    const elR = renderer.create( <PokemonListings {...MockProps} /> )
    expect(elR.toJSON()).toMatchSnapshot()
  })
})

