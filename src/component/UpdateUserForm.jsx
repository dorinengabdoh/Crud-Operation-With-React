import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";
import { MESSAGES_FR } from "../translation";
import useListUsers from "../hooks/UseGetUser";

const UPDATE_USER = gql`
mutation EditUser($id: String!, $first_name: String!, $last_name: String!, $email: String!, $birth_date: String!, $gender: String!) {
  editUser(id: $id, first_name: $first_name, last_name: $last_name, email: $email, birth_date: $birth_date, gender: $gender) {
    id
    first_name
    last_name
    email
    birth_date
    gender
  }
}
`;

function UpdateUserForm({ user,onClose }) {
  const [first_name, setFirstName] = useState(user?.first_name);
  const [last_name, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [birth_date, setBirthdate] = useState(user?.birth_date);
  const [gender, setGender] = useState(user?.gender);
  const { refetch } = useListUsers()

  const [editUser] = useMutation(UPDATE_USER)

  const handleUpdateeUser = async () => {
    console.log("hey", first_name, last_name, email, birth_date, gender);
    await editUser({
      variables: {
        id: user.id,
        first_name:first_name,
        last_name:last_name,
        email: email,
        birth_date:birth_date,
        gender:gender
      },
    })
    await refetch();
    onClose();
  };


  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center gb-light">
      <div className="w-100 vh-1 border bg-whiteshadow px-5 pt-3 pb-5 rounded">
        <h2>
          <FormattedMessage id="updateUser" />
        </h2>
        <div className="mb-2">
          <label htmlFor="firstName">firstName: </label>
          <input
            name="firstName"
            type="text"
            placeholder={MESSAGES_FR.firstName}
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lastName">lastName: </label>
          <input
            name="lastName"
            type="text"
            placeholder={MESSAGES_FR.lastName}
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            type="email"
            placeholder={MESSAGES_FR.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="birth_date">birth_date: </label>
          <input
            name="birth_date"
            type="date"
            placeholder={MESSAGES_FR.date}
            value={birth_date}
            onChange={(e) => setBirthdate(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="gender">Gender: </label>
          <input
            name="gender"
            type="text"
            placeholder={MESSAGES_FR.gender}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="form-control"
          />
        </div>

        <button className="btn btn-success" onClick={handleUpdateeUser}>
          <FormattedMessage id="update" />
        </button>

      </div>
    </div>
  );
}
export default UpdateUserForm;
