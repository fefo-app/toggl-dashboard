import styled from 'styled-components'

export default styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: center;
  width: 100%;

  img {
    width: 64px;
    margin-bottom: 24px;
  }

  form {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    fieldset {
      align-items: center;
      border: none;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
    }

    fieldset > input,
    button {
      margin: 8px 0;
      padding: 8px;
    }
  }
`
