import React, { createContext, useContext, useState } from "react";

// Create Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Child Component Using Context
const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ThemeButton />
    </ThemeProvider>
  );
};

export default App;
________________

import React, { createContext, useContext, useState } from "react";

// 1. Create Context
const AuthContext = createContext();

// 2. Create Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create Custom Hook
const useAuth = () => useContext(AuthContext);

// 4. Consumer Component  
const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};

// 5. Using Context in App
const App = () => {
  return (
    <AuthProvider>
      <Profile />
    </AuthProvider>
  );
};

export default App;

// "Context API is a built-in state management solution in React that enables global state sharing without prop drilling.
//  It is useful for managing themes, authentication states, user preferences, and global app settings.
//  Unlike Redux, Context API is lightweight but may cause unnecessary re-renders if not optimized properly."
// "I have implemented Context API in multiple projects to handle user authentication and maintain global application settings.
//  To avoid performance issues, I ensure that context providers are structured efficiently and avoid unnecessary re-renders by splitting context into multiple providers when needed."