


import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { HouseCard } from '../HouseCard'

import * as Card from 'antd/lib/card'
import 'antd/lib/card/style/css'

import * as Flipcard from 'react-flipcard'



const MockProps = {
  id: 'idtest',
  houseProps: {
    landArea: '800m',
    LOT: 'LotTest',
    PLAN: 'PlanTest'
  },
  showHouseCard: false
}

test('<HouseCard /> component should contain 1 images', () => {
  const el = shallow( <HouseCard {...MockProps} /> )
  expect(el.find('img').length).toEqual(1)
})

test('<HouseCard /> component should contain 2 Cards', () => {
  const el = shallow( <HouseCard {...MockProps} /> )
  expect(el.find(Card).length).toEqual(2)
})

test('<HouseCard /> component should contain <FlipCard/>', () => {
  const el = shallow( <HouseCard {...MockProps} /> )
  expect(el.find(Flipcard).length).toEqual(1)
})
