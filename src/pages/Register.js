import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
// import { useFrom } from "../utils/hooks";

function Register(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (event) => {
    setRegisterUser({
      ...registerUser,
      [event.target.name]: event.target.value,
    });
  };
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log("📩", result);
      navigate("/");
    },
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.errors
          : {}
      );
    },
  });
  const onSubmit = (event) => {
    event.preventDefault();
    addUser({ variables: registerUser });
  };

  return (
    <div className="form-containner">
      <h1>Register</h1>

      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <Form.Input
          label="Username"
          placeholder="Username..."
          type="text"
          name="username"
          value={registerUser.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          type="email"
          name="email"
          value={registerUser.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          type="password"
          name="password"
          value={registerUser.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confrim Password"
          placeholder="Password..."
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword ? true : false}
          value={registerUser.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>

        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </Form>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      created_at
      token
    }
  }
`;

export default Register;
