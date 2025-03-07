import client from '../../../apolloClient';
import { gql } from '@apollo/client';

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

const UPDATE_USER = gql`
  mutation updateUser($name: String!, $email: String!, $role: String!) {
    updateUser(name: $name, email: $email, role: $role) {
      id
      name
      email
      role
    }
  }
`;

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

  try {
    const { data } = await client.mutate({
      mutation: UPDATE_USER,
      variables: { name, email, role },
    });
    return data.updateUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
