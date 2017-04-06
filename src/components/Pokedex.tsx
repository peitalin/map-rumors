
import * as React from 'react'

import SearchBar from './SearchBar'
import Title from './Title'

import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'



export class Pokedex extends React.Component<any, any> {

  state = {
    searchTerm: '',
    searchPokemon: '',
    filterElement: '',
  }

  render() {
    let maxPrice: number = 10**8
    return (
      <div>
        <Title>
          <div className='w-100 bg-light-gray pa5'>
            <form>
              <fieldset>
                <p className='grow f4'>Search for a Pokemon.</p>
                <legend className='f3' style={{width: 'initial', borderBottom: 'initial'}}>
                  Pokedex
                </legend>
                { !this.state.isSearch && (<SearchBar />) }
              </fieldset>
            </form>
          </div>
        </Title>
      </div>
    )
  }
}


export default Pokedex


