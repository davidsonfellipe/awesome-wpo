import React from 'react'
import styled from 'styled-components'

import Link from '../components/Link'
import ItemDate from '../components/ItemDate'

import { screen } from '../styles/screen'

const Date = styled(ItemDate)`
  display: none;

  ${screen.md} {
    display: inherit;
  }
`

const PostLink = ({ post }) => (
  <Link href={post.frontmatter.path}>
    {post.frontmatter.title}
    <Date>{post.frontmatter.date}</Date>
  </Link>
)

export default PostLink
