import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Hello from "../components/Hello"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Hello />
  </Layout>
)

export default IndexPage
