
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import {
  connect,
  MapStateToProps,
  MapDispatchToPropsObject,
  MapDispatchToPropsFunction,
  Dispatch,
} from 'react-redux'
import { ReduxState } from '../reducer'

import PokemonStatsGQL from './PokemonStats'

import * as AutoComplete from 'antd/lib/auto-complete'
import 'antd/lib/auto-complete/style/css'
import * as Spin from 'antd/lib/spin'
import 'antd/lib/spin/style/css'
import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'



interface SearchBarState {
  searchTerm: string
  searchPokemon: string
  filterElement: string
}


export class SearchBar extends React.Component<any, SearchBarState> {

  state = {
    searchTerm: '',
    searchPokemon: '',
    filterElement: '',
  }

  handleSelectElement = (event: string) => {
    this.setState({ filterElement: event })
  }

  handleSelectPokemon = (event: string) => {
    this.setState({ searchTerm: event })
  }

  handleSubmit = () => {
    this.setState({
      searchPokemon: this.state.searchTerm,
      searchTerm: '',
      filterElement: ''
    })
    this.props.toggleShowModal(false)
  }

  render() {
    if (this.props.data.loading) { return <Spin /> }
    if (this.props.data.error) { return <div>Graphql Error in SearchBar</div> }

    // flatten object by elementalType key, then flatten list
    let elements = this.props.data.allPokemons
                      .map(o => o.elementalType)
                      .reduce((i, j) => i.concat(j), [])
    let uniqElements = Array.from(new Set(elements))

    const pokemonList = (this.state.filterElement === '')
      ? this.props.data.allPokemons.map(p => p.name)
      : this.props.data.allPokemons
          .filter(p => p.elementalType.includes(this.state.filterElement))
          .map(p => p.name)

    return (
      <div>

        <AutoComplete
          dataSource={pokemonList}
          placeholder='Pokemon'
          allowClear={true}
          value={this.state.searchTerm}
          onChange={this.handleSelectPokemon}
        />

        <AutoComplete
          dataSource={uniqElements}
          placeholder='Element'
          allowClear={true}
          value={this.state.filterElement}
          onChange={this.handleSelectElement}
        />

        <Link to={ `/map/pokemon/${this.state.searchTerm}` }>
          <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
        </Link>

      </div>
    )
  }
}

const mapStateToProps = ( state: ReduxState ): ReduxState => {
  return {
    showModal: state.showModal
  }
}

const mapDispatchToProps = ( dispatch: Dispatch ): MapDispatchToPropsObject => {
  return {
    toggleShowModal: (bool: boolean) => dispatch({ type: "SHOW_MODAL", payload: bool }),
  }
}

const SearchBarQuery = gql`
{
  allPokemons {
    name
    elementalType
  }
}
`

export default graphql(SearchBarQuery)(
  connect(mapStateToProps, mapDispatchToProps)( SearchBar )
)

