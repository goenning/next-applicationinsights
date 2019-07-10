import * as React from 'react';
import { AppProps, default as NextApp, AppContext } from 'next/app';
import Router from 'next/router';

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
  return false; //process.env.NODE_ENV !== "production";
}

const getComponentName = (component?: React.ComponentType<any>) => {
  if (component) {
    return component.displayName || component.name;
  }
  return undefined;
}

let appInsights: ApplicationInsights;

export const withApplicationInsights = (config: IConfiguration & IConfig) => {
  return (App: typeof NextApp) => {``
    return class WithApplicationInsights extends React.Component<WithApplicationInsightsProps & AppProps> {
      public static getInitialProps = async (appCtx: AppContext) => {
        let appProps = { pageProps: {} };
        if (App.getInitialProps) {
          appProps = {...appProps, ...await App.getInitialProps(appCtx) };
        }
        return { 
          ...appProps,
          pageName: getComponentName(appCtx.Component) || location.pathname
        };
      }

      public componentDidMount() {
        console.log('componentDidMount');
        if (!IS_BROWSER || isDev()) {
          return;
        }

        this.initializeAppInsights();
        this.trackPageView();
      }

      private initializeAppInsights() {
        if (!appInsights) {
          appInsights = new ApplicationInsights({ config });
          appInsights.loadAppInsights();
          window.appInsights = appInsights;
        }
      }

      private trackPageView() {
        if (appInsights) {
          console.log(this.props);
          const name = getComponentName(this.props.Component) || location.pathname;
          const properties = {
            route: this.props.router.route,
          }
          if (this.props.router.query) {
            for (const key in this.props.router.query) {
              properties[`query.${key}`] = this.props.router.query[key];
            }
          }
          appInsights.trackPageView({ name, properties });
        }
      }

      public render() {
        this.trackPageView();
        return React.createElement(App, this.props);
      }
    }
  };
};