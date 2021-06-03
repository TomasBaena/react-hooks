// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

// in an interactive app you need to hold states
// React has special functions called "hooks" to do this
// ex:
// React.useState
// React.useEffect
// React.useContext
// React.useRef
// React.useReducer
// Each hook has its own api and can return different things. Ex. React.useState returns a pair of values vs. React.useRef returns a value

import * as React from 'react'

// main
// function Greeting() {
//   // 💣 delete this variable declaration and replace it with a React.useState call
//   const [name, setName] = React.useState("");

//   function handleChange(event) {
//     // 🐨 update the name here based on event.target.value
//     setName(event.target.value);
//   }

//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// function App() {
//   return <Greeting />
// }

// export default App
//=====================================
// extra 1
function Greeting({initialName}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [name, setName] = React.useState(initialName);

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Tom"/>
}

export default App
