import styled from 'styled-components'

export default styled.form`
  select,
  button {
    background-color: #4c4c4c;
    border: none;
    color: white;
    font-weight: bold;
    height: 24px;
    padding: 0 8px;
    text-align: center;
  }

  select {
    border-radius: 20px 0 0 20px;
    font-size: 80%;
    line-height: 80%;
  }

  button {
    background: teal;
    color: white;
    border-radius: 0 20px 20px 0;
  }
`
