import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

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
  }, [length, numbersAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charAllowed, passwordGenerator]);

  const passwordRef = useRef(null);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="flex flex-col w-full max-w-xl mx-auto bg-gray-900 rounded-2xl px-4 py-6 mt-10 shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-white mb-6">
          Password Generator
        </h1>

        {/* FIRST SECTION */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-2 mb-6">
          <input
            type="text"
            value={password}
            className="bg-gray-300 w-full sm:w-auto flex-grow px-4 py-3 rounded-full text-orange-400 text-base font-bold"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipBoard}
            className="bg-blue-600 px-6 py-3 text-white text-sm font-bold rounded-full hover:bg-blue-700 transition"
          >
            Copy
          </button>
        </div>

        {/* SECOND SECTION */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 px-2">
          <div className="flex items-center gap-2">
            <input
              type="range"
              value={length}
              min={6}
              max={100}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-orange-400 text-sm">
              Length ({length})
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numbersAllowed}
              onChange={() => setNumbersAllowed(prev => !prev)}
              className="cursor-pointer"
            />
            <label className="text-orange-400 text-sm">Numbers</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="cursor-pointer"
            />
            <label className="text-orange-400 text-sm">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
