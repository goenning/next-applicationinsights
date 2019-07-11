# next-applicationinsights

Automatically track page views, dependency calls and exceptions on you Next.js applications by using [Azure Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview).

## How to use

Install the package with npm

```sh
npm install next-applicationinsights
```

Wrap Next's `App` in `pages/_app.js` with a call to `withApplicationInsights`.

```js
import App, { Container } from 'next/app'
import { withApplicationInsights } from 'next-applicationinsights';

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
```

That's it! 🎉

## Configuration

This package uses `@microsoft/applicationinsights-web`, so all configuration options from this package are supported by `withApplicationInsights`.

`isEnabled` is a custom property that can be used to enable/disable AI tracking. We recommend the usage of `process.env.NODE_ENV === 'production'` if you want to enable tracking in production builds only.