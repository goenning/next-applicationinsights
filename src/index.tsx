import { Component, ComponentType } from 'react';
import { AppProps, default as NextApp, DefaultAppIProps, NextAppContext } from 'next/app';

import { ApplicationInsights, IConfiguration, IConfig } from '@microsoft/applicationinsights-web'

const IS_BROWSER = typeof window !== "undefined";

interface WithApplicationInsightsProps {
  pageName: string;
}

declare global {
  interface Window {
    appInsights?: ApplicationInsights;
  }
}

const isDev = () => {
  return process.env.NODE_ENV !== "production";
}

const getComponentName = (component?: ComponentType<any>) => {
  if (component) {
    return component.displayName || component.name;
  }
  return undefined;
}

export const withApplicationInsights = (config: IConfiguration & IConfig) => {
  return (App: typeof NextApp) => {``
    return class WithApplicationInsights extends Component<WithApplicationInsightsProps & AppProps & DefaultAppIProps> {
      public static getInitialProps = async (appCtx: NextAppContext) => {
        let appProps: DefaultAppIProps = { pageProps: {} };
        if (App.getInitialProps) {
          appProps = {...appProps, ...await App.getInitialProps(appCtx) };
        }
        return { 
          ...appProps,
          pageName: getComponentName(appCtx.Component) || location.pathname
        };
      }

      public componentDidMount() {
        if (!IS_BROWSER || isDev()) {
          return;
        }

        const trackOnRouteChange = (url: string) => {
          let name = url;
          const component = this.props.router.components[url];
          if (component) {
            name = getComponentName(component.Component) || url;
          }
          appInsights.trackPageView({ name });
        }

        this.props.router.events.on('routeChangeComplete', (url: string) => trackOnRouteChange(url));
        this.props.router.events.on('routeChangeError', (url: string) => trackOnRouteChange(url));

        const appInsights = new ApplicationInsights({ config });
        appInsights.loadAppInsights();
        appInsights.trackPageView({ name: this.props.pageName });
        window.appInsights = appInsights;
      }

      public render() {
        return <App {...this.props} />;
      }
    }
  };
};