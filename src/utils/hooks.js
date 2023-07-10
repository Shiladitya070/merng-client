import { useState } from "react";

export const useFrom = (callback, initialState = {}) => {
  const [registerUser, setRegisterUser] = useState(initialState);

  const onChange = (event) => {
    // console.log("👆", registerUser);
    setRegisterUser({
      ...registerUser,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    registerUser,
  };
};
