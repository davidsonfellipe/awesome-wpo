import React from 'react'
import { graphql } from 'gatsby'

import PostLink from '../components/PostLink'
import Title from '../components/Title'
import Section from '../components/Section'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const BlogPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <SEO title="Blog" />
      <Section>
        <Title>BLOG</Title>
        <div>{Posts}</div>
      </Section>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`
