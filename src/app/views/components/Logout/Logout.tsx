import React, { Dispatch } from 'react'
import { BrowserStore } from '../../helpers'
import { LogOut as LogOutIcon } from '@styled-icons/feather/LogOut'
import StyleWrapper from './Logout.styled'
import { logout, TogglAction } from '../../../store/toggl'

export function Logout({ dispatch }: { dispatch: Dispatch<TogglAction> }) {
  const onClick = () => {
    dispatch(
      (() => {
        BrowserStore.reset()
        return logout() as TogglAction
      })()
    )
  }
  return (
    <StyleWrapper>
      <button onClick={onClick}>
        <LogOutIcon size='36' />
      </button>
    </StyleWrapper>
  )
}
