

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { mount, shallow, render } from 'enzyme'
import { RadarGraph } from '../Radar'


const data = [
    { BaseStats: 'Attack', A: 5, fullMark: 10 },
    { BaseStats: 'Defense', A: 6, fullMark: 10 },
    { BaseStats: 'Speed', A: 2, fullMark: 10 },
    { BaseStats: 'HP', A: 7, fullMark: 10 },
    { BaseStats: 'Sp. Atk', A: 2, fullMark: 10 },
    { BaseStats: 'Sp. Def', A: 9, fullMark: 10 },
]


test('<RadarGraph /> component should render', () => {
  const radarR = renderer.create( <RadarGraph data={data} /> )
  expect(radarR.toJSON()).toMatchSnapshot()
})


test('<RadarGraph /> should contain svg elements', () => {
  const radar = shallow( <RadarGraph data={data} /> )
  expect(radar.find('svg')).toBeDefined()
})
