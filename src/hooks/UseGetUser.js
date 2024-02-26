import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect } from 'react';
import { setUsers } from '../store/slices/userSlices';


// get query
export const GET_USERS = gql`
  query {
    all_users {
      id
      first_name
      last_name
      email
      birth_date
      gender
    }
  }
`;

/**
 * Retrieves a list of users from the server and updates the Redux store with the fetched data.
 *
 * @return {loading: boolean, error: any, users: User[], refetch: Function} An object containing information about the loading state, any errors that occurred, and the list of users.
 */
export default function useListUsers(){
  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users.users);

  const { loading, error, data, refetch } = useQuery(GET_USERS);

  useEffect(() => {
    if (data) {
      dispatch(setUsers(data.all_users));
    }
  }, [data, dispatch]);

  return {
    loading, error, users, refetch
  }
}