import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";
import { MESSAGES_FR } from "../translation";
import useListUsers from "../hooks/UseGetUser";


const CREATE_USER = gql`
    mutation AddNewUser(
      $first_name: String!
      $last_name: String!
      $email: String!
      $birth_date: String!
      $gender: String!
    ) {
      add_new_user(
        first_name: $first_name
        last_name: $last_name
        email: $email
        birth_date: $birth_date
        gender: $gender
      ) {
        id
        first_name
        last_name
        email
        birth_date
        gender
      }
    }
  `;


function CreateUserForm({ user }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birth_date, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const { refetch } = useListUsers()

  const [add_new_user] = useMutation(CREATE_USER);

  const handleCreateUser = async () => {
    console.log(user);
      await add_new_user({
        variables: {
          first_name,
          last_name,
          email,
          birth_date,
          gender,
        },
      }); await refetch();
      setFirstName("");
      setLastName("");
      setEmail("");
      setBirthdate("");
      setGender("");
    }


  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center gb-light">
      <div className="w-100 vh-1 border bg-whiteshadow px-5 pt-3 pb-5 rounded">
        <h2>
          <FormattedMessage id="createUser" />
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

        <button className="btn btn-success" onClick={handleCreateUser}>
          <FormattedMessage id="create" />
        </button>
  
      </div>
    </div>
  );
}
export default CreateUserForm;
