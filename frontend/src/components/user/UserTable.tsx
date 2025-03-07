'use client';

import React, { useState } from 'react';
import UserModal from './UserModal';

interface UserTableProps {
  users: { id: number; name: string; email: string; role: string }[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<{ id: number; name: string; email: string; role: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableUsers, setTableUsers] = useState(users);

  const handleEdit = (user: { id: number; name: string; email: string; role: string }) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = (updatedUser: { id: number; name: string; email: string; role: string }) => {
    const updatedUsers = tableUsers.map((user) => {
      if (user.id === updatedUser.id) {
        return updatedUser;
      }
      return user;
    });
    setTableUsers(updatedUsers);
  };


  return (
    <div className="max-w-4xl mx-auto p-4 mt-4">
      <table className="table-auto w-full text-left text-sm">
        <thead className="">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Role</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
        </thead>
        <tbody>
        {tableUsers.map((user) => (
          <tr key={user.id} className="border-b border-gray-200">
            <td className="px-4 py-2">{user.name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.role}</td>
            <td className="px-4 py-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {isModalOpen && selectedUser && (
        <UserModal user={selectedUser} onClose={() => setIsModalOpen(false)} handleUpdateUser={handleUpdateUser} />
      )}
    </div>
  );
};

export default UserTable;
