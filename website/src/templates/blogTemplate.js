import React from "react"
import { graphql } from "gatsby"

import Section from "../components/Section"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostContent from "../components/PostContent"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <Section>
        <PostContent>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </PostContent>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
