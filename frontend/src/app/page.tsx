import { redirect } from 'next/navigation';
import { getUser } from '@/lib/utils/getUser';
import Navbar from '@/components/common/Navbar';

const Home = async () => {
  const user = await getUser();

  if(!user) {
    redirect('/auth?mode=login');
  }

  return (
    <>
      <Navbar isAdmin={user.role === 'admin'} />
      <div
        className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1>Welcome to the Home Page</h1>
        </main>
      </div>
    </>
  );
};

export default Home;
