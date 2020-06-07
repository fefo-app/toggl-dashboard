import React, { FormEvent, Dispatch } from 'react'
import { loginDispatcher, TogglAction } from '../../../store/toggl'
import StyleWrapper from './Login.styled'

export function Login({ dispatch }: { dispatch: Dispatch<TogglAction> }) {
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const username = form.username.value
    const password = form.password.value
    loginDispatcher(dispatch)(username, password)
  }

  return (
    <StyleWrapper>
      <img
        src='https://toggl.com/common/images/share/favicon/favicon-192x192-29519727140c0d39a540787154c03a2f.png'
        alt='Toggl Logo'
      />
      <form onSubmit={onSubmit}>
        <fieldset>
          <label htmlFor='username'>Email:</label>
          <input
            name='username'
            placeholder='Email que usas en toggl'
            type='text'
          />
        </fieldset>
        <fieldset>
          <label htmlFor='username'>Contraseña:</label>
          <input name='password' placeholder='Contraseña' type='password' />
        </fieldset>
        <button type='submit'>Login</button>
      </form>
    </StyleWrapper>
  )
}
