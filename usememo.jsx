// import React, { useState, useMemo } from "react";

// const ExpensiveCalculation = ({ number }) => {
//   const computeFactorial = (num) => {
//     console.log("Calculating factorial...");
//     return num <= 0 ? 1 : num * computeFactorial(num - 1);
//   };

//   // Memoizing the factorial computation
//   const factorial = useMemo(() => computeFactorial(number), [number]);

//   return <div>Factorial of {number} is {factorial}</div>;
// };

// const App = () => {
//   const [count, setCount] = useState(0);
//   const [number, setNumber] = useState(5);

//   return (
//     <div>
//       <ExpensiveCalculation number={number} />
//       <button onClick={() => setCount(count + 1)}>Increase Count ({count})</button>
//       <button onClick={() => setNumber(number + 1)}>Increase Number ({number})</button>
//     </div>
//   );
// };

// export default App;

import React, { useState, useMemo } from "react";

const ExpensiveComponent = ({ items, filter }) => {
  const filteredItems = useMemo(() => {
    console.log("Filtering items...");
    return items.filter((item) => item.includes(filter));
  }, [items, filter]); // Recomputes only when `items` or `filter` change

  return <ul>{filteredItems.map((item, index) => <li key={index}>{item}</li>)}</ul>;
};

export default ExpensiveComponent;

// useMemo is a performance optimization hook in React that memoizes the result of an expensive computation to prevent unnecessary recalculations during re-renders. 
// It is particularly useful in cases where we have complex calculations inside a component, large lists, or when a component depends on a derived value that doesn't need to be recomputed on every render."
// "In my projects, I’ve used useMemo for optimizing filtering and sorting operations on large datasets. It ensures that calculations are performed only when necessary, improving rendering performance

Key Takeaways for Interview
✅ Avoid unnecessary computations (e.g., sorting, filtering large datasets).
✅ Used in performance-critical areas like search, pagination, and derived state calculations.
✅ Doesn’t prevent re-renders, only optimizes calculations.



const fetchdata  = async()=> {
  const data = fetch("https://jsonplaceholder.typicode.com/posts")
  const response = await data.json();
  const result = 
}