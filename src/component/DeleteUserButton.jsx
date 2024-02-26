import React from 'react';
import { useMutation } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { gql } from '@apollo/client';
import { GET_USERS } from './UserList';
import useListUsers from '../hooks/UseGetUser';


const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    delete_user_by_id(id: $id) {
      id
    }
  }
`;

function DeleteUserButton({ userId }) {
  const {refetch}=useListUsers()
  const [deleteUser] =useMutation(DELETE_USER);
  const handleDeleteUser = async() => {
   await deleteUser({
      variables: {
        id: userId,
      },
    });
    await refetch();
  };

  return (
    <button  className="btn btn-sm btn-secondary m-2" onClick={handleDeleteUser}>
      <FormattedMessage id="delete" />
    </button>
  );
}

export default DeleteUserButton;
