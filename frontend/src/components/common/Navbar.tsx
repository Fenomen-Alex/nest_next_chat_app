import Link from 'next/link';

const Navbar = ({ isAdmin = false }: { isAdmin?: boolean }) => {

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link href="/">
          <span className="hover:text-blue-100 transition duration-300">Home</span>
        </Link>

        {isAdmin && (
          <Link href="/admin/users">
            <span className="hover:text-blue-100 transition duration-300">Users</span>
          </Link>
        )}
      </div>
      <Link href="/auth/logout">
        <span
          className="bg-purple-400 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded transition duration-300">Logout</span>
      </Link>
    </nav>
  );
};

export default Navbar;
