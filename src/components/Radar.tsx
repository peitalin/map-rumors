

import * as React from 'react'

// import { Radar, RadarChart } from 'recharts'
// import { PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import Radar from 'recharts/lib/polar/Radar'
import RadarChart from 'recharts/lib/chart/RadarChart'
import PolarGrid from 'recharts/lib/polar/PolarGrid'
import PolarAngleAxis from 'recharts/lib/polar/PolarAngleAxis'
import PolarRadiusAxis from 'recharts/lib/polar/PolarRadiusAxis'



export interface RadarGraphProps {
  data?: Array<{}>
}

let RadarChart: React.ComponentClass<RadarChartProps>
interface RadarChartProps {
  data: Array<{}>
  width: number
  height: number
  cx?: string | number
  cy?: string | number
  startAngle?: number
  innerRadius?: string | number
  outerRadius?: string | number
  margin?: {}
  clockWise?: boolean
  onMouseEnter?: () => any
  onMouseLeave?: () => any
  onClick?: () => any
}


let Radar: React.ComponentClass<RadarProps>
interface RadarProps {
  dataKey: string | number
  points?: Array<{}>
  shape?: any
  dot?: any
  label?: any
  labels?: any
  isAnimationActive?: boolean
  animationBegin?: number
  animationDuration?: number
  animationEasing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
  name?: string
  stroke?: string
  fill?: string
  fillOpacity?: number
  strokeOpacity?: number
}

export class RadarGraph extends React.Component<RadarGraphProps, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      windowWidth: window.innerWidth,
    }
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth })
    console.log("window.innerWidth: ", window.innerWidth)
  }

  render() {
    let windowWidth = this.state.windowWidth
    return (
      <div>
        <RadarChart cx={windowWidth/4} cy={windowWidth/4}
          outerRadius={windowWidth/8}
          width={windowWidth/2} height={windowWidth/2}
          data={this.props.data}>
          <Radar name="BaseStats" dataKey="A"
            stroke="#108ee9" fill="#108ee9" fillOpacity={0.3}/>
          <Radar name="BaseStats" dataKey="C"
            stroke="#108ee9" fill="#108ee9"
            fillOpacity={0} strokeOpacity={0]}/>
          <PolarGrid />
          <PolarAngleAxis dataKey="BaseStats" />
          <PolarRadiusAxis/>
        </RadarChart>
      </div>
    );
  }
}


