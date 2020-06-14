import styled from "styled-components"

import { font } from "../styles/theme"
import { screen } from "../styles/screen"

const Title = styled.h1`
  color: #333;
  font-style: normal;
  font-family: ${font.title};
  line-height: 1em;
  margin: 50px 0 20px 0;
  font-size: 40px;
  letter-spacing: -2px;

  ${screen.md} {
    font-size: 50px;
    line-height: 1em;
    margin: 70px 0 20px 0;
  }
`

export default Title
