import React, { useRef } from "react";

const InputFocus = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Directly accessing the input DOM element
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};
_____________________
export default InputFocus;

import React, { useState, useRef, useEffect } from "react";

const PreviousValueTracker = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(count);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]); // Updates ref but doesn't trigger re-render

  return (
    <div>
      <p>Current Count: {count}</p>
      <p>Previous Count: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default PreviousValueTracker;



// he useRef hook is used for persisting values across renders without causing re-renders.
//  It is primarily used for accessing DOM elements directly and for storing mutable values that don’t trigger component updates.
//  Unlike useState, updating a useRef value doesn’t re-trigger a render."
// "I’ve used useRef in various scenarios, such as keeping track of previous state values, 
// handling uncontrolled form inputs, managing timers, and optimizing event handlers in animations

Key Takeaways for Interview
✅ Doesn’t cause re-renders like useState.
✅ Commonly used for DOM manipulations, storing previous values, and managing timers.
✅ Efficient in optimizing animations and preventing unnecessary updates.
