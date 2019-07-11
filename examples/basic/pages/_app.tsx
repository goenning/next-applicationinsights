import React from 'react'
import App, { Container } from 'next/app'
import { withApplicationInsights } from '../../../dist';

class MyApp extends App {
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
  instrumentationKey: 'YOUR_KEY_GOES_HERE',
  isEnabled: true //process.env.NODE_ENV === 'production'
})(MyApp)