import styled from "styled-components";

export default styled.section`
  margin: 8px;

  .title {
    align-items: center;
    display: flex;

    h3 {
      margin-left: 8px;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 0;
    margin: 0 auto;
    width: 100%;
  }
`;

export const StyledEntry = styled.li<{ color?: string }>`
  align-items: center;
  background-color: #4c4c4c;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px;
  padding: 8px 16px;

  span {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .entry {
    justify-content: flex-start;
    background-color: #4c4c4c;
    width: 100%;

    .time {
      justify-content: flex-start;
      color: gray;
      min-width: 100px;
      position: relative;

      &:after {
        content: "|";
        position: absolute;
        right: 0;
        margin: 0 8px;
      }
    }
  }

  .client {
    align-items: center;
    display: flex;
    color: gray;
    line-height: 24px;
    justify-content: flex-end;
    margin-left: 8px;
    min-width: 160px;
    text-align: right;
    width: auto;

    .project-dot {
      position: relative;
      margin: 0 8px 0 4px;
    }

    .project-dot:before {
      background-color: ${({ color = "lightslategray" }) => color};
      content: "";
      position: absolute;
      height: 8px;
      width: 8px;
      border-radius: 20px;
    }
  }
`;
