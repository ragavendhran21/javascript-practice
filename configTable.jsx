// App.js
import React, { useState } from "react";

function App() {
  const [configs, setConfigs] = useState([
    { id: 1, name: "Site Name", value: "MyWebsite" },
    { id: 2, name: "Max Users", value: "100" },
    { id: 3, name: "Theme", value: "Dark" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEditClick = (config) => {
    setEditingId(config.id);
    setTempValue(config.value);
  };

  const handleSaveClick = (id) => {
    const updatedConfigs = configs.map((config) =>
      config.id === id ? { ...config, value: tempValue } : config
    );
    setConfigs(updatedConfigs);
    setEditingId(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Config Table</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Config Name</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {configs.map((config) => (
            <tr key={config.id}>
              <td>{config.name}</td>
              <td>
                {editingId === config.id ? (
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                ) : (
                  config.value
                )}
              </td>
              <td>
                {editingId === config.id ? (
                  <button onClick={() => handleSaveClick(config.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(config)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
___________________________________

import React, { useEffect, useState } from "react";

const Component = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const result = await response.json();
      setProducts(result.products);
      setFilteredData(result.products);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm === "") {
        setFilteredData(products);
      } else {
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = products.filter((item) =>
          item.title.toLowerCase().includes(lowerSearch)
        );
        setFilteredData(filtered);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
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