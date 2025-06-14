import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  // ALL DECLARATIONS
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  
  // * using callBack Function for optimization
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersAllowed) str += "01234567899876543210";
    if (charAllowed) str += "!@#$%^&*()_+-=|;:";

    for (let i = 0; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, charAllowed, setPassword]);

  // * using useEffect() to run as side code
  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charAllowed, passwordGenerator]);

  const passwordRef = useRef(null);
  const buttonCLickref=useRef(null);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  

 

  return (
    <>
      {/* PASSWORD GENERATOR BOX */}
      <div className="flex flex-col w-1/2  mx-auto bg-gray-900 rounded-2xl">
        <h1 className="text-3xl  md:text-4xl font-bold text-center text-white">
          Password Generator
        </h1>

        {/* FIRSTSECTION  */}
        <div className="firstSection flex flex-row justify-center align-middle py-4">
          <input
            type="text"
            value={password}
            className="bg-gray-300
           w-full px-4 py-3 ml-4 rounded-l-full text-orange-400 text-base font-bold"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={(copyPasswordToClipBoard)}
            ref={buttonCLickref}
            className="bg-blue-600 px-5 mr-4 text-xl font-bold rounded-r-full"
          >
            Copy
          </button>
        </div>

        {/* SECOND SECTION */}
        <div className="secondSection flex flex-row justify-center align-middle">
          <input
            type="range"
            value={length}
            min={6}
            max={100}
            className="cursor-pointer"
            onChange={(event) => {
              setLength(event.target.value);
            }}
          />
          <label className="text-orange-400 mr-3">Length({length})</label>

          <input
            type="checkbox"
            defaultChecked={numbersAllowed}
            onChange={() => {
              setNumbersAllowed((previousValue) => !previousValue);
            }}
            className="cursor-pointer"
          />
          <label className="text-orange-400 mr-3">Numbers</label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((previousValue) => !previousValue);
            }}
          />
          <label className="text-orange-400 mr-3">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
