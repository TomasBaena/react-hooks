// Lifting state
// http://localhost:3000/isolated/exercise/03.js

//What happens if two components want to share a state?
// "Lifting the state": Finding lowest common parent to 
//two components and placing the state management there, then passing 
// the state and a mechanism for updating the state down into the 
// components that need it

import * as React from 'react'

function Name({name, onNameChange}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={onAnimalChange}
      />
    </div>
  )
}

// 🐨 uncomment this
function Display({name, animal}) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

function App() {
  // 🐨 add a useState for the animal
  const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name name={name} onNameChange={event => setName(event.target.value)} />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
      {/* 🐨 pass the animal prop here */}
      <Display name={name} animal={animal} />
    </form>
  )
}

export default App
