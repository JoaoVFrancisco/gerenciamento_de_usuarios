// authService.js
import api from './api';

export const login = async (email, senha) => {
  try {
    const response = await api.post('/login', { email, senha });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.mensagem || 'Erro ao fazer login');
  }
};

export const register = async (nome, email, senha, tipo) => {
  try {
    await api.post('/usuarios', { nome, email, senha, tipo });
  } catch (error) {
    throw new Error(error.response?.data?.mensagem || 'Erro ao registrar usuário');
  }
};

export const logout = async () => {
  // Implemente se necessário
};