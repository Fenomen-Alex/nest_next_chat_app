'use client'
import { ApolloProvider } from '@apollo/client';
import client from '../../apolloClient';
import { AuthProvider } from './AuthContext';

const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
};

export default ApolloWrapper;
