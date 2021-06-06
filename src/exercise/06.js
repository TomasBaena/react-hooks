// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

// Notes
// You can only return a clean up function in useEffect
// If you have an async/await you want to run inside useEffect you need to
// wrap it in it's own funtion and call it to prevent useEffect from returning 
// something other than a clean up function.

// this does not work, don't do this:
// React.useEffect(async () => {
//   const result = await doSomeAsyncThing()
//   // do something with the result
// })

// do this
// React.useEffect(() => {
//   async function effect() {
//     const result = await doSomeAsyncThing()
//     // do something with the result
//   }
//   effect()
// })
// or using a util async util function
// React.useEffect(() => {
//   doSomeAsyncThing().then(result => {
//     // do something with the result
//   })
// })

// 6.2 using status organize code
// 6.3 use object in state to reduce the amount of state setting and initializations
// 6.4 error boundries https://reactjs.org/docs/error-boundaries.html

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'

class ErrorBoundary extends React.Component {
  state = {error: null}
  static getDerivedStateFromError(error) {
    return {error}
  }
  render() {
    const {error} = this.state
    if (error) {
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null
  })
  const {status, pokemon, error} = state;

  React.useEffect(()=>{
    if (!pokemonName) return
    setState({status: 'pending', pokemon: null})
    fetchPokemon(pokemonName).then( 
      pokemonData => setState({status: 'resolved', pokemon: pokemonData}),
      error => setState({status: 'rejected', error: error}))
  }, [pokemonName])
  if (status == 'idle') return 'Submit a pokemon'
  else if (status == 'pending') return <PokemonInfoFallback name={pokemonName} />
  else if (status == 'resolved') return <PokemonDataView pokemon={pokemon} />   
  else if (status == 'rejected') throw error
}

function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
