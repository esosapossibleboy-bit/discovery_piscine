import { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('esosa_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('esosa_token'));

  const login = (userData, jwt) => {
    localStorage.setItem('esosa_user', JSON.stringify(userData));
    localStorage.setItem('esosa_token', jwt);
    setUser(userData);
    setToken(jwt);
  };
  const logout = () => {
    localStorage.removeItem('esosa_user');
    localStorage.removeItem('esosa_token');
    setUser(null);
    setToken(null);
  };
  return (
    <AuthContext.Provider value={{user, token, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);