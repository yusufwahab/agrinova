import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('agroguard_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - replace with real authentication
    const mockUser = {
      id: '1',
      name: 'John Farmer',
      email: email,
      farmName: 'Green Valley Farm',
      location: 'California, USA',
      avatar: '/api/placeholder/40/40'
    };
    
    setUser(mockUser);
    localStorage.setItem('agroguard_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const signup = async (userData) => {
    // Mock signup
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: '/api/placeholder/40/40'
    };
    
    setUser(newUser);
    localStorage.setItem('agroguard_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agroguard_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;