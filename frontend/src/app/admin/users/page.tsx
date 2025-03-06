import { User } from '@/types/user';
import { getUser } from '@/lib/utils/getUser';
import { redirect } from 'next/navigation';
import { getUsers } from '@/lib/dal/auth';

const Users = async () => {
  const user = await getUser();
  if (!user || user.role !== 'admin') {
    redirect('/');
  }

  const users = await getUsers();
  console.log(users);

  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
          </tr>
          </thead>
          <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
