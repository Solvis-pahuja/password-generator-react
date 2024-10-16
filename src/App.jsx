import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLenth] = useState(10);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numberAllowed, charAllowed, setPassword, length]);
  useEffect(() => {
    passwordGen();
  }, [length, numberAllowed, charAllowed, passwordGen]);
  const CopyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <h1 className="text-white text-4xl text-center font-bold pt-40  ">
      SOLVIS PASSWORD GENERATOR 
      </h1>

      <div className="flex flex-col justify-between bg-gray-600 p-8 m-2 rounded-xl">
        <div className="flex text-blue-900 font-bold text-2xl">
          <input
            type="text"
            placeholder="Password"
            value={password}
            className="w-full py-2 px-2 my-5 rounded-xl"
            readOnly
            ref={passwordRef}
          />
          <button
            className="ml-4 px-4 my-5 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={CopyPassword}
          >
            Copy
          </button>
        </div>

        <div className="flex   text-blue-900 font-bold text-2xl justify-start">
          <div className="flex items-center gap-x-1 mr-8 ">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLenth(e.target.value);
              }}
            />
            <label htmlFor="" className="text-white">
              Password Lenght : {length}
            </label>
          </div>
          <div className="flex items-center gap-x-1 mr-10">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />

            <label htmlFor="" className="text-yellow-500">
              Add Numbers ?
            </label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />

            <label htmlFor="" className="text-yellow-500">
              Add Chars ?
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
