import { gql } from '@apollo/client';
import client from '../../../apolloClient';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refresh_token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      refresh_token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

const REFRESH_TOKEN_QUERY = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      access_token
    }
  }
`;

export async function login(email: string, password: string) {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });
    return data.login;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function register(name: string, email: string, password: string) {
  try {
    const { data } = await client.mutate({
      mutation: REGISTER_MUTATION,
      variables: { name, email, password },
    });
    return data.register;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function refreshToken(refreshToken: string) {
  try {
    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN_QUERY,
      variables: {
        refreshToken,
      },
    });
    return data.refreshToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

