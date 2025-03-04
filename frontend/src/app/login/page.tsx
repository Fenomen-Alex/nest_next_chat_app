'use client';

import { FormEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const REGISTER_USER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      id
      email
    }
  }
`;

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loginUser ] = useMutation(LOGIN_USER);
  const [registerUser ] = useMutation(REGISTER_USER);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginUser ({ variables: { email, password } });
      console.log('hey', data);
      const token = data.login;
      login(token);
      localStorage.setItem('token', token);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await registerUser ({ variables: { name, email, password } });
      setIsRegistering(false); // Switch back to login after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-surface rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-primary">
          {isRegistering ? 'Create an Account' : 'Login to Your Account'}
        </h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
          {isRegistering && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-primary rounded hover:bg-blue-600 focus:outline-none"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        <p className="text-center">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-primary hover:underline"
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
