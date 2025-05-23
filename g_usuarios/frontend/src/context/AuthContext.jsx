import  { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, logout } from '../services/authService.js';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAdmin(decoded.tipo === 'ADM');
    }
  }, [token]);

  const signIn = async (email, senha) => {
    try {
      const response = await login(email, senha);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      navigate('/users');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const signUp = async (nome, email, senha, tipo) => {
    try {
      await register(nome, email, senha, tipo);
      navigate('/login');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};