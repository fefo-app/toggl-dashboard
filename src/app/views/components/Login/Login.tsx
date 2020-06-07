import React, { FormEvent, Dispatch } from 'react'
import { loginDispatcher, TogglAction } from '../../../store/toggl'

export function Login({dispatch}: {dispatch: Dispatch<TogglAction>}) {

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const username = form.username.value;
    const password = form.password.value;
    loginDispatcher(dispatch)(username, password)
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        placeholder={"Email que usas en toggl"}
        type="text"
      />
      <input
        name="password"
        placeholder={"Contraseña"}
        type="password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
