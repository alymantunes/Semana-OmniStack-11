import React, { useState} from 'react';

function App() {
  const [counter,setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <h1>counter: {counter}</h1>
      <button onClick={increment}>increment</button>
    </div>
  );
}

export default App;
