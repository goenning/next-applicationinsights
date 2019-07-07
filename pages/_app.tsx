import React from 'react'
import App, { Container, NextAppContext } from 'next/app'
import { withApplicationInsights } from '../src';

class MyApp extends App {
  static async getInitialProps(ctx: NextAppContext) {
    if (ctx.Component.getInitialProps) {
      return await ctx.Component.getInitialProps(ctx.ctx)
    }

    return { }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default withApplicationInsights({ 
  instrumentationKey: 'e59928a0-1de7-443d-bb4d-72aa5fd39132'
})(MyApp)