'use client'
import Link from 'next/link';
import { useActionState } from 'react';
import { signup, login } from '@/app/actions/auth';

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [state, action, pending] = useActionState(isLogin ? login : signup, undefined)

  return (
    <div className="w-full max-w-md p-8 space-y-6  rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Register'}</h1>
      <form action={action} className="space-y-4">
        {!isLogin && (
          <label className="block">
            Name:
            <input type="text" name="name" required className="w-full p-2 mt-1 border border-gray-300 rounded" />
            {/*@ts-ignore*/}
            {state?.errors?.name && (
              <><p>Name must</p>
                <ul>
                  {/*@ts-ignore*/}
                  {state.errors.name.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </>
            )}
          </label>
        )}
        <label className="block">
          Email:
          <input type="email" name="email" required className="w-full p-2 mt-1 border border-gray-300 rounded" />
          {state?.errors?.email && (
            <>
              <p>Email must:</p>
              <ul>
                {state.errors.email.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </>
          )}
        </label>
        <label className="block">
          Password:
          <input type="password" name="password" required
                 className="w-full p-2 mt-1 border border-gray-300 rounded" />
          {state?.errors?.password && (
            <>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </>
          )}
        </label>
        <button disabled={pending} type="submit" className="w-full py-2 mt-4  bg-blue-600 rounded hover:bg-blue-700">
          {isLogin ? 'Login' : 'Register'}
        </button>
        <Link
          href={`/auth?mode=${isLogin ? 'register' : 'login'}`}
          className="block w-full py-2 mt-2 text-center text-blue-600 hover:underline"
        >
          {isLogin ? 'Need to Register?' : 'Already have an account?'}
        </Link>
      </form>
    </div>
  );
};

export default AuthForm;
