// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

// React.useEffect is a built-in hook that allows you to run 
// some custom code after React renders (and re-renders) your 
// component to the DOM. It accepts a callback function which 
// React will call after the DOM has been updated:

// React.useEffect(() => {
//   // your side-effect code here.
//   // this is where you can make HTTP requests or interact with browser APIs.
// })

// useEffect and reading from storage can be costly. Instead can pass function to useState
// React.useState(() => someExpensiveComputation())

import * as React from 'react'

  //credit 3
  // custom hooks can be called from other components
  function useLocalStorageState(key, defaultValue = '') {
    const [state, setState] = React.useState(
      () => window.localStorage.getItem(key) || defaultValue,
    )
  
    React.useEffect(() => {
      window.localStorage.setItem(key, state)
    }, [key, state])
  
    return [state, setState]
  }

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  // main
  // const [name, setName] = React.useState(window.localStorage.getItem('name') || initialName)
  
  // credit 1 & 2 lazy state initialization, using a function instead only reads once.
  // Useful if initialization is computation heavy
  // https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates
  // const [name, setName] = React.useState(()=>{return window.localStorage.getItem('name') || initialName});

  

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  //main & credit 1
  // React.useEffect(()=>{
  //   window.localStorage.setItem('name', name);
  // })

  //credit 2
  //useEffect is called after every render, but we only want to
  //set local storage if name state actually changes
  //padding 'dependancy array' signals to react that the callback
  //function should only be ran when dependancies change
  // React.useEffect(()=>{
  //   window.localStorage.setItem('name', name);
  // },[name])  
  const [name, setName] = useLocalStorageState('name', initialName);
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
