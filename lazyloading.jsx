

import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const Dashboard = lazy(() => import("./Dashboard"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;


// Lazy loading is a performance optimization technique used to reduce the initial bundle size by loading components asynchronously only when needed.
//  In React, React.lazy() and Suspense enable code splitting at the component level, improving load times for large applications."
// "In my previous projects, I used lazy loading for modularized routes and heavy components like charts and dashboards. 
// This helped in reducing the initial page load time and improved Lighthouse performance scores."

Key Takeaways for Interview
✅ Used for code splitting, reducing bundle size.
✅ Improves performance in large applications, especially with routing.
✅ Can be combined with dynamic imports (import()) for further optimizations.



const debounce = (value, delay) => {
  const [debounce, setDebounce] = useState(value);
   

    useEffect(()=> {
      const handler = setTimeout(() => {
        setDebounce(value)
      },delay)
      return () => clearTimeout(handler)
    },[value,delay])

    return debounceValue;

}

const search = ()=> {
const [searchTerm,setSearchTerm] = useState('');
const debounceInput = useDebounce(input, 500)

useEffect(()=>{
  if(!debounceInput) {
    setresult ([])
  }
})

 
  return (
    <input type="text" placeholder="search" onChange={(e)=> setiput(e.target,value)}/>

  )
}