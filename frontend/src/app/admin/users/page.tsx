import { getUser } from '@/lib/utils/getUser';
import { redirect } from 'next/navigation';
import { getUsers } from '@/lib/dal/user';
import UserTable from '@/components/user/UserTable';
import Navbar from '@/components/common/Navbar';

const Users = async () => {
  const user = await getUser();
  if (!user || user.role !== 'admin') {
    redirect('/');
  }

  const users = await getUsers();

  return (
    <>
      <Navbar isAdmin={user.role === 'admin'} />
      <div className="container mx-auto p-4 mt-4">
        <h1 className="text-3xl font-bold mb-4 block text-center">User Management</h1>
        <div className="overflow-x-auto">
          <UserTable users={users} />
        </div>
      </div>
    </>
  );
};

export default Users;
