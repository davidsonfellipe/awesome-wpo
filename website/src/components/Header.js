import React from "react"
import Link from "gatsby-link"
import styled from "styled-components"

import Section from "./Section"
import { screen } from "../styles/screen"
import { font } from "../styles/theme"

const Logo = styled.span`
  display: inline-block;
  text-align: left;
  width: 40%;
`

const Wrapper = styled(Section)`
  position: relative;
  max-width: ${screen.max};
`

const Nav = styled.nav`
  color: #000;
  padding: 25px 0;
  margin: 0 auto;
  width: 100%;
  text-transform: uppercase;

  a {
    font-family: ${font.title};
    text-decoration: none;
  }
`

const Links = styled.div`
    display: inline-block;
    position: absolute;
    right: 0;

    a {
      padding: 0;

      &:after {
        content: ' ';
        display: inline-block;
        text-align: center;
        width: 50px;
      }

      &:last-child:after {
        display: none;
      }
    }
  }
`

const Header = () => (
  <Nav>
    <Wrapper>
      <Logo>
        <Link to="/">Awesome WPO</Link>
      </Logo>

      <Links>
        <Link to="/articles/">articles</Link>
        <Link to="/blogs/">blogs</Link>
        <Link to="/meetups/">meetups</Link>
        <Link to="/people/">people</Link>
        <Link to="/talks/">talks</Link>
      </Links>
    </Wrapper>
  </Nav>
)

export default Header
