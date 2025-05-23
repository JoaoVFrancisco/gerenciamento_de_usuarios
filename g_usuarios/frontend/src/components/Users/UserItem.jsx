// UserItem.jsx
import React from 'react';

const UserItem = ({ user, onDelete, onUpdate, isAdmin }) => {
  return (
    <tr>
      <td>{user.id_usuarios}</td>
      <td>{user.nome}</td>
      <td>{user.email}</td>
      <td>{user.tipo}</td>
      <td>
        <button onClick={() => onUpdate(user)}>Editar</button>
        {isAdmin && (
          <button onClick={() => onDelete(user.id_usuarios)}>Deletar</button>
        )}
      </td>
    </tr>
  );
};

export default UserItem;