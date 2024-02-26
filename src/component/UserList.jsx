import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";
import "../App.css";
import DeleteUserButton from './DeleteUserButton'
import useListUsers from "../hooks/UseGetUser";
import { Modal } from 'react-responsive-modal';
import UpdateUserForm from './UpdateUserForm'


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

function UserList() {
  const [item, setItem] = useState(null);
  const { error, loading, users: data } = useListUsers();
  if (loading) return <FormattedMessage id="loading" />;
  if (error) return <FormattedMessage id="error" />;
  return (
    <div className="d-flex flex-column jsutify-content-center align-items-center bg-light vh-10">
      <h1>Users List</h1>
      <div className="W-75 rounded bg-while border shoow p-6">
        <table className="table table-stipend ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Birth_date</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <tr className="all" key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.birth_date}</td>
                <td>{user.gender}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={() => setItem(user)}
                  >
                    Edit
                  </button>
                  <DeleteUserButton userId={user.id}></DeleteUserButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal open={item!= null} onClose={() => setItem(null)} center>
          <h2>Edit User</h2>
          <UpdateUserForm onClose={() => setItem(null)} user={item}></UpdateUserForm>
        </Modal>
      </div>
    </div>
  );
}
export default UserList;
