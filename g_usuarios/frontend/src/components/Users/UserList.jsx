// UserList.jsx
import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import UserItem from './UserItem';
import UserForm from './UserForm';
import { AuthContext } from '../../context/AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const { isAdmin, signOut } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/usuarios');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401) {
          signOut();
        }
        setError('Erro ao carregar usuários');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [signOut]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      setUsers(users.filter(user => user.id_usuarios !== id));
    } catch (error) {
      setError('Erro ao deletar usuário');
    }
  };

  const handleUpdate = (user) => {
    setEditingUser(user);
  };

  const handleUpdateSubmit = async (updatedUser) => {
    try {
      await api.put(`/usuarios/${updatedUser.id_usuarios}`, updatedUser);
      setUsers(users.map(user => 
        user.id_usuarios === updatedUser.id_usuarios ? updatedUser : user
      ));
      setEditingUser(null);
    } catch (error) {
      setError('Erro ao atualizar usuário');
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-list">
      <h2>Lista de Usuários</h2>
      {editingUser ? (
        <UserForm user={editingUser} onSubmit={handleUpdateSubmit} onCancel={() => setEditingUser(null)} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <UserItem 
                key={user.id_usuarios} 
                user={user} 
                onDelete={handleDelete} 
                onUpdate={handleUpdate}
                isAdmin={isAdmin}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;