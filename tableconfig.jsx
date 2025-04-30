import React, { useState } from 'react';

// Sample table configuration
const tableConfig = {
  columns: [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
  ],
  data: [
    { id: 1, name: 'John Doe', age: 28, role: 'Developer' },
    { id: 2, name: 'Jane Smith', age: 32, role: 'Designer' },
    { id: 3, name: 'Bob Johnson', age: 45, role: 'Manager' },
  ]
};

const ConfigurableTable = ({ config }) => {
  const { columns, data } = config;
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Handle sorting
  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortField(field);
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  // Apply sorting to data
  const sortedData = [...data].sort((a, b) => {
    if (sortField) {
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      if (typeof valueA === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      } else {
        return sortDirection === 'asc' 
          ? valueA - valueB 
          : valueB - valueA;
      }
    }
    return 0;
  });

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          {columns.map(column => (
            <th 
              key={column.key}
              className="px-4 py-2 text-left cursor-pointer"
              onClick={column.sortable ? () => handleSort(column.key) : undefined}
            >
              {column.label}
              {sortField === column.key && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map(row => (
          <tr key={row.id}>
            {columns.map(column => (
              <td key={`${row.id}-${column.key}`} className="px-4 py-2 border-t">
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Configurable Table</h1>
      <ConfigurableTable config={tableConfig} />
    </div>
  );
};

export default App;
3. For the form config, here's a sample approach:
jsximport React, { useState } from 'react';

// Sample form configuration
const formConfig = {
  fields: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'age', label: 'Age', type: 'number', min: 18, max: 100 },
    { name: 'role', label: 'Role', type: 'select', options: [
      { value: 'developer', label: 'Developer' },
      { value: 'designer', label: 'Designer' },
      { value: 'manager', label: 'Manager' }
    ]},
    { name: 'comments', label: 'Comments', type: 'textarea' }
  ],
  submitLabel: 'Save'
};

const ConfigurableForm = ({ config }) => {
  const { fields, submitLabel } = config;
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form data
    console.log('Form submitted:', formData);
    // You would typically send this to an API
  };

  const renderField = (field) => {
    const { name, label, type, required, ...rest } = field;
    
    switch (type) {
      case 'select':
        return (
          <select
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required={required}
          >
            <option value="">Select {label}</option>
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'textarea':
        return (
          <textarea
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required={required}
            rows={4}
            {...rest}
          />
        );
        
      default:
        return (
          <input
            type={type}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required={required}
            {...rest}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.name} className="form-group">
          <label className="block mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}
      
      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {submitLabel || 'Submit'}
      </button>
    </form>
  );
};

const App = () => {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Configurable Form</h1>
      <ConfigurableForm config={formConfig} />
    </div>
  );
};

export default App;
4. Combining both components in an application
You can use both components together in a single app:
jsximport React, { useState } from 'react';
import ConfigurableTable from './ConfigurableTable';
import ConfigurableForm from './ConfigurableForm';

// Your configurations here...

const App = () => {
  const [data, setData] = useState(tableConfig.data);
  
  const handleFormSubmit = (formData) => {
    // Add new data to the table
    const newRow = {
      id: data.length + 1,
      ...formData
    };
    
    setData([...data, newRow]);
  };
  
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Configurable Components</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Add New Record</h2>
        <ConfigurableForm 
          config={formConfig} 
          onSubmit={handleFormSubmit}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Records</h2>
        <ConfigurableTable config={{...tableConfig, data}} />
      </div>
    </div>
  );
};

export default App;
5. Key interview points to emphasize
When discussing this solution in your interview:
Configuration-driven components: Emphasize how your components are driven by JSON configurations, making them highly reusable and flexible.
Separation of concerns: The table and form components are separate, each with their own responsibilities.
Validation logic: For forms, highlight how you handle validation based on the configuration.
Dynamic rendering: Explain how you dynamically render different form field types based on the configuration.
Performance considerations: Mention how you could optimize these components (e.g., with useMemo for sorting/filtering) for larger datasets.
Extensibility: Discuss how easily you could extend these components with new features (e.g., pagination for tables, more field types for forms).
Type safety: You could mention how you'd implement TypeScript interfaces for these configurations to ensure type safety.

This approach demonstrates a solid understanding of React component design patterns and should impress interviewers looking for React expertise.

