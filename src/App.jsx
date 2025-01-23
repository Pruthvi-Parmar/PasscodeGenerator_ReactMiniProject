import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <h1 className='text-3xl text-center font-bold mb-4 text-purple-500'>Password Generator</h1>
      <div className="flex justify-center mb-4">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              value={password}
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className='ml-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
            >Copy</button>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-700 mb-2">Length:</label>
            <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label className="text-sm text-gray-700 mt-2">{length}</label>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-700 mb-2">Options:</label>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                    setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className="text-sm text-gray-700 ml-2">Numbers</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                    setCharAllowed((prev) => !prev )
                }}
              />
              <label htmlFor="characterInput" className="text-sm text-gray-700 ml-2">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default App