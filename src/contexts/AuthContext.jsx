import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Load user from localStorage on initial load
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Update localStorage whenever user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    }
  }, [currentUser]);
  
  // Mock login functionality
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll just simulate a successful login
      // after a short delay if email includes "@" and password is at least 6 chars
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Create a mock user object
      const user = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        avatar: null
      };
      
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mock signup functionality
  const signup = async (email, password, name) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll just simulate a successful signup
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      if (!name || name.length < 2) {
        throw new Error('Name is required and must be at least 2 characters');
      }
      
      // Create a mock user object
      const user = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email,
        name,
        avatar: null
      };
      
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout functionality
  const logout = () => {
    setCurrentUser(null);
  };
  
  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;