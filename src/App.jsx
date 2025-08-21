import { useRef } from "react";
import setStorge from "./storge";

function App() {
  const { second, setSecond } = setStorge();
  const intervalIdRef = useRef(null);

  function setTime() {
    if (intervalIdRef.current) return;
    const time = setInterval(() => {
      setSecond(prev => prev + 1); 
    }, 100);

    intervalIdRef.current = time;
  }

  function killTime() {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  }

  return (
    <div className="max-w-[200px] mx-auto border my-20 flex flex-col gap-5 p-10">
      <span className="p-2 border text-center w-16 mx-auto">{second}</span>
      <div className="flex justify-between">
        <button
          className="border p-2 rounded-xl active:bg-red-500"
          onClick={setTime}
        >
          Start
        </button>
        <button
          className="border p-2 rounded-xl active:bg-blue-500"
          onClick={killTime}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default App;
