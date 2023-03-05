import React, { Component } from 'react'
import Layout from './hoc/Layout/layout'
import Burgerbuilder from './container/burgerbuilder/burgerbuilder'
export default class App extends Component {


  render() {
    return (
      <div>
      <Layout>
<Burgerbuilder/>

      </Layout>
      </div>
    )
  }
}