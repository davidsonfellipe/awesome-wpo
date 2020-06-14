import styled from 'styled-components'

import { screen } from '../styles/screen'

const ItemDate = styled.span`
  font-size: 20px;
  color: #ccc;
  display: block;

  ${screen.lg} {
    position: absolute;
    right: 0;
    top: 15px;
  }
`

export default ItemDate
