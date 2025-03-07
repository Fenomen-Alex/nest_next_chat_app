'use client';

import React, { useActionState, useState } from 'react';
import { updateUserAction } from '@/app/actions/auth';

interface UserModalProps {
  user: { id: number; name: string; email: string; role: string };
  onClose: () => void;
  handleUpdateUser: (updatedUser: { id: number; name: string; email: string; role: string }) => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose, handleUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [state, action, pending] = useActionState(updateUserAction, undefined)
  const handleSubmit = (formData: FormData) => {
    action(formData);
    handleUpdateUser({
      id: user.id,
      name,
      email,
      role
    });
    onClose();
  }

  return (
    <div className="fixed inset-0  bg-opacity-75 flex justify-center items-center">
      <div className=" rounded-lg shadow-md p-4 w-96">
        <h2 className="text-lg font-bold mb-4">Update User</h2>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded-lg"
            />
            {state?.errors?.name && (<p>{state.errors.name.join(',')}</p>)}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded-lg"
            />
            {state?.errors?.email && (<p>{state.errors.email.join(',')}</p>)}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role:</label>
            <input
              type="text"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded-lg"
            />
            {state?.errors?.role && (<p>{state.errors.role}</p>)}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              disabled={pending}
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
