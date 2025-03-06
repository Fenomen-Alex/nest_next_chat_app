import { gql } from '@apollo/client';
import client from '../../../apolloClient';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
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
      user {
        id
        email
        name
        role
      }
    }
  }
`;

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
      mutation: gql`
        mutation RefreshToken($refreshToken: String!) {
          refresh_token(refreshToken: $refreshToken) {
            token
          }
        }
      `,
      variables: { refreshToken },
    });
    return data.refresh_token;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUsers() {
  try {
    const { data } = await client.query({
      query: GET_USERS,
    });
    return data.users;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(name?: string, email?: string, role?: string) {
  const query = gql`
    mutation {
      updateUser(name: "${name}", email: "${email}", role: "${role}") {
        id
        email
        name
        role
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: query,
      variables: { name, email, role },
    });
    return data.updateUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
