'use client';

import { useQuery, useMutation, gql } from '@apollo/client';
import { User } from '@/types/user';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const GET_USERS = gql`
  query users {
    users {
      id
      name
      email
      role
    }
  }
`;

const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($userId: Int!, $role: String!) {
    updateUserRole(userId: $userId, role: $role) {
      id
      role
    }
  }
`;

const Users = () => {
  const { user } = useAuth();
  const router = useRouter();
  console.log(user);
  if (!user || user.role !== 'ADMIN') {
    // router.push('/');
  }
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }

  return (
    <div>
      <h1>User Management</h1>
      <ul>
        {data.users.map((user: User) => (
          <li key={user.id}>
            {user.name} ({user.email}) - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
