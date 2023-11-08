import React, { useState, useCallback } from 'react'
import { useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) {
      str += "1234567890"
    }
    if (charAllowed) {
      str += "!@#$%^&*[]{}~`_-+=<>,./?"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)


    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  useEffect(() => { passwordGenerator() },
    [length, charAllowed, numAllowed, passwordGenerator])

  const passRef = useRef(null)

  const copy = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
    alert("Password is copied...")
  },
    [password])



  return (
    <>
      <div className="w-full max-w-md px-4 py-3 mx-auto my-8 font-mono text-base text-orange-500 bg-gray-800 rounded-lg shadow-md ">
        <h1 className="font-serif text-center text-white my-2.5">Password Generator</h1>
        <div className="flex mb-4 overflow-hidden rounded-lg shadow ">
          <input
            type="text"
            value={password}
            className="w-full max-w-md outline-none px-2.5 py-1 "
            placeholder='password'
            readOnly
            ref={passRef}
          />
          <button
            onClick={copy}
            className="px-2 text-white bg-blue-500 shadow-md outline-none hover:bg-blue-600 active:bg-blue-700 ">copy</button>
        </div>
        <div className="flex px-1 mx-1 text-sm gap-x-3 shrink-0">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-3 ">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              onClick={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label>Number</label>
            {console.log(numAllowed)}
          </div>
          <div className="flex items-center gap-x-3 ">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onClick={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
