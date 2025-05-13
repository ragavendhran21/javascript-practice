
  
  // Example
  const numbers = [5, 10, 3, 20, 15];
  console.log(findSecondHighest(numbers)); // 15


  21.simple from

  import React, { useState } from 'react';

function UserForm() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    occupation: ''
  });
  
  // State for displaying the submitted data
  const [submitted, setSubmitted] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  
  return (
    <div className="form-container">
      <h2>User Information Form</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Submit</button>
      </form>
      
      {submitted && (
        <div className="output-container">
          <h3>Submitted Information:</h3>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Occupation:</strong> {formData.occupation}</p>
        </div>
      )}
      
      <style jsx>{`
        .form-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        
        button:hover {
          background-color: #45a049;
        }
        
        .output-container {
          margin-top: 20px;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

export default UserForm;
______________________________________________


_______________________________________
shallowcopy, deepcopy

const orginalcart = {
  user:{id: 233, name: 'john'}
}


_________________________________-----

import React, { useEffect, useState, useMemo, useCallback } from "react";

const Component = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Memoize the fetchData function with useCallback
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const result = await response.json();
      setProducts(result.products);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }, []);
  
  // Fetch data only once when component mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Memoize the filtered data to avoid unnecessary calculations
  const filteredData = useMemo(() => {
    if (searchTerm === "") {
      return products;
    }
    
    const lowerSearch = searchTerm.toLowerCase();
    return products.filter((item) =>
      item.title.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, products]);
  
  // Memoize the input change handler
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredData.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Component;
_______________________________________

function findMethod (){
  let arr = [1, 2, 3, 4, 5];
  let data = arr.find((item)=> item > 3)
}

______________________________________________

import React, { useEffect, useState, useMemo } from "react";

const Component = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch data once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const result = await response.json();
        setProducts(result.products);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    
    fetchData();
  }, []);
  
  // Memoize the filtered data to avoid recalculation on every render
  const filteredData = useMemo(() => {
    if (searchTerm === "") {
      return products;
    }
    
    const lowerSearch = searchTerm.toLowerCase();
    return products.filter((item) =>
      item.title.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, products]);
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredData.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Component;
______________________________________________
const numbers = [10, 20, 30];

const total = numbers.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(total); // 👉 60
