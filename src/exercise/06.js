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
// 6.5 remount error boundry by adding key prop to error boundry
// 6.6 use react-error-boundry instead
// 6.7 reset state of eroor boundary when user clicks button
// 6.8 use reset keys so the user doesn't have to click the try again button 

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

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

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[pokemonName]} onReset={handleReset}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
