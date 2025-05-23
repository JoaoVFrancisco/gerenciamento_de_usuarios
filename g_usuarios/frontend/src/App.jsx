import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserList from './components/Users/UserList';
import PrivateRoute from './components/PrivateRouter';
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UserList />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<h1>Bem-vindo ao Sistema de Usuários</h1>} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;