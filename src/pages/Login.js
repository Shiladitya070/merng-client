import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [registerUser, setRegisterUser] = useState({
    username: "",
    password: "",
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
      // console.log("😒", Object.keys(errors).length > 0 && "hi");
    },
  });
  const onSubmit = (event) => {
    event.preventDefault();
    addUser({ variables: registerUser });
  };

  return (
    <div className="form-containner">
      <h1>Login</h1>
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
          label="Password"
          placeholder="Password..."
          type="password"
          name="password"
          value={registerUser.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message" style={{ display: "grid" }}>
            <ul className="list">
              {Object.values(errors).map((value) => (
                // console.log(value)
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
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export default Login;
