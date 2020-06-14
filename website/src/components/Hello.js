import React from "react"
import styled from "styled-components"

import { screen } from "../styles/screen"
import { font } from "../styles/theme"

const Name = styled.h1`
  font-family: ${font.title};
  margin: 75px 0 25px 0;
  font-size: 75px;
  text-transform: uppercase;

  ${screen.lg} {
    font-size: 150px;
    margin: 200px 0 15px -5px;
    letter-spacing: -0.04em;
  }
`

const Text = styled.p`
  font-size: 18px;
  display: none;
  line-height: 1.5em;
  padding: 30px 0 0;
  position: relative;
  vertical-align: top;

  a {
    text-decoration: underline;
  }

  &:before {
    background: #000;
    display: block;
    content: " ";
    height: 5px;
    position: absolute;
    top: 0;
    width: 100px;
  }

  ${screen.lg} {
    display: inline-block;
  }
`

const Sidebar = () => (
  <section>
    <Name>Awesome WPO</Name>
    <Text>
      A curated list of Web Performance Optimization. Everyone can contribute
      here!
    </Text>
  </section>
)

export default Sidebar
