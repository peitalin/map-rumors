

import * as React from 'react'
import { iPokemon } from './interfaceDefinitions'
import { Link } from 'react-router-dom'

import * as Card from 'antd/lib/card'
import 'antd/lib/card/style/css'
import * as Row from 'antd/lib/row'
import 'antd/lib/row/style/css'
import * as Col from 'antd/lib/col'
import 'antd/lib/col/style/css'


interface EvolutionsProps {
  prevEvolution?: iPokemon[]
  nextEvolution?: iPokemon[]
}


class Evolutions extends React.Component<EvolutionsProps, any> {

  generateCard = (evolution: iPokemon[]): iPokemon[] => {
    if (!evolution) {
      return []
    } else {
      return evolution.map(p => {
        return (
          <Col span={8} key={p.name}>
            <Link to={ `/map/pokemon/${p.name}` } className="link" >
              <Card className='grow' title={p.name}>
                  <img className='' src={p.img} alt={p.img}/>
              </Card>
            </Link>
          </Col>
        )
      })
    }
  }

  render() {
    let prevEvo = this.generateCard(this.props.prevEvolution)
    let nextEvo = this.generateCard(this.props.nextEvolution)
    let allEvos = [...prevEvo, ...nextEvo]
    return (
      <Row style={{display: 'flex', justifyContent: 'space-around'}}>
        { allEvos }
      </Row>
    )
  }
}



export default Evolutions;

