import React, { ChangeEvent } from 'react'

export const generateOnInputChange = (
  setState: React.Dispatch<React.SetStateAction<string>>
) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setState(event.currentTarget.value)
}
