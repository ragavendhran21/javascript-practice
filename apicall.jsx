/*
src/
├── api/
│   ├── index.js             // API client configuration and exports
│   ├── apiConfig.js         // Base URLs, headers, timeouts, etc.
│   ├── interceptors.js      // Request/response interceptors
│   ├── services/
│   │   ├── authService.js   // Authentication-related API calls
│   │   ├── userService.js   // User-related API calls
│   │   ├── policyService.js // Policy-related API calls
│   │   └── ...
│   └── utils/
│       ├── errorHandler.js  // Centralized error handling
│       ├── cacheUtils.js    // API response caching utilities
│       └── ...
├── hooks/
│   ├── useApi.js            // Custom hook for API calls
│   ├── useAuth.js           // Authentication hook
│   └── ...
└── ...



// Approach 1: Fetch with .then() chains
import { useState, useEffect } from "react";

const Component = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPolicyData = () => {
    setLoading(true);
    fetch("https://dummyapi")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network error: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPolicyData();
    // Add dependency array to prevent infinite loop
  }, []);

  // Rest of component...
};

// Approach 2: Fetch with async/await
import { useState, useEffect } from "react";

const Component = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPolicyData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyapi");
      
      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicyData();
    // Add dependency array to prevent infinite loop
  }, []);

  // Rest of component...
};

// Approach 3: Axios
import { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is installed and imported

const Component = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPolicyData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://dummyapi");
      setData(response.data); // Note: Axios wraps response in .data property
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicyData();
    // Add dependency array to prevent infinite loop
  }, []);

  // Rest of component...
};

// Bonus: Fetch with AbortController for cleanup
import { useState, useEffect } from "react";

const Component = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    
    const fetchPolicyData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyapi", { signal });
        
        if (!response.ok) {
          throw new Error(`Network error: ${response.status}`);
        }
        
        const result = await response.json();
        if (!signal.aborted) {
          setData(result);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error fetching data:", error);
          setError(error.message);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPolicyData();
    
    // Cleanup function to cancel pending requests when component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  // Rest of component...
};





// Project Structure Example
/*
src/
├── api/
│   ├── index.js             // API client configuration and exports
│   ├── apiConfig.js         // Base URLs, headers, timeouts, etc.
│   ├── interceptors.js      // Request/response interceptors
│   ├── services/
│   │   ├── authService.js   // Authentication-related API calls
│   │   ├── userService.js   // User-related API calls
│   │   ├── policyService.js // Policy-related API calls
│   │   └── ...
│   └── utils/
│       ├── errorHandler.js  // Centralized error handling
│       ├── cacheUtils.js    // API response caching utilities
│       └── ...
├── hooks/
│   ├── useApi.js            // Custom hook for API calls
│   ├── useAuth.js           // Authentication hook
│   └── ...
└── ...
*/

// 1. apiConfig.js - Base configuration
import axios from 'axios';

// Environment-based API URLs
const API_ENVIRONMENTS = {
  development: 'https://dev-api.example.com',
  staging: 'https://staging-api.example.com',
  production: 'https://api.example.com',
};

// Get current environment or default to development
const currentEnv = process.env.REACT_APP_ENV || 'development';

// Create base axios instance with configuration
const apiClient = axios.create({
  baseURL: API_ENVIRONMENTS[currentEnv],
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default apiClient;

// 2. interceptors.js - Request/response interceptors
import apiClient from './apiConfig';
import { getToken } from '../utils/authStorage';

// Request interceptor for auth headers
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle authorization errors
    if (response?.status === 401) {
      // Handle token expiration
      // e.g., redirect to login or refresh token
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Handle server errors
    if (response?.status >= 500) {
      // Log to monitoring service
      console.error('Server error:', error);
    }
    
    return Promise.reject(error);
  }
);

// 3. services/policyService.js - Service module example
import apiClient from '../apiConfig';

export const PolicyService = {
  // Get all policies with optional filters
  getAllPolicies: async (filters = {}) => {
    try {
      const response = await apiClient.get('/policies', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get a single policy by ID
  getPolicyById: async (id) => {
    try {
      const response = await apiClient.get(`/policies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Create a new policy
  createPolicy: async (policyData) => {
    try {
      const response = await apiClient.post('/policies', policyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update an existing policy
  updatePolicy: async (id, policyData) => {
    try {
      const response = await apiClient.put(`/policies/${id}`, policyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Delete a policy
  deletePolicy: async (id) => {
    try {
      const response = await apiClient.delete(`/policies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// 4. utils/errorHandler.js - Centralized error handling
export const handleApiError = (error) => {
  // Extract error details
  const status = error.response?.status;
  const message = error.response?.data?.message || error.message;
  const data = error.response?.data;
  
  // Create standardized error object
  const formattedError = {
    status,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  
  // Log to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    // Send to monitoring service like Sentry
    // Sentry.captureException(error);
  }
  
  return formattedError;
};

// 5. hooks/useApi.js - Custom hook for API calls
import { useState, useCallback } from 'react';
import { handleApiError } from '../utils/errorHandler';

export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (error) {
      const formattedError = handleApiError(error);
      setError(formattedError);
      throw formattedError;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);
  
  return { execute, data, error, loading };
};

// 6. Example component using the hooks and services
import React, { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { PolicyService } from '../api/services/policyService';

const PolicyList = () => {
  const { 
    execute: fetchPolicies, 
    data: policies, 
    loading, 
    error 
  } = useApi(PolicyService.getAllPolicies);
  
  useEffect(() => {
    // Fetch policies with filters
    fetchPolicies({ status: 'active' });
  }, [fetchPolicies]);
  
  if (loading) return <div>Loading policies...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>Policies</h1>
      <ul>
        {policies?.map((policy) => (
          <li key={policy.id}>{policy.name}</li>
        ))}
      </ul>
    </div>
  );
};

// 7. index.js - Export all services and utilities
export { default as apiClient } from './apiConfig';
export * from './services/authService';
export * from './services/userService';
export * from './services/policyService';
// ... export other services