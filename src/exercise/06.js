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



// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(()=>{
    if (!pokemonName)
      return
    setPokemon(null)
    fetchPokemon(pokemonName).then( 
      pokemonData => setPokemon(pokemonData),
      error => setError(error)) // adding error handling
  }, [pokemonName])
  if (error){ //return error
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
  else if (!pokemonName)
    return 'Submit a pokemon'
  else if(!pokemon)
    return <PokemonInfoFallback name={pokemonName} />
  else
    return <PokemonDataView pokemon={pokemon} />    
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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
