

declare module 'react-router-dom' {
  export type Action = 'PUSH' | 'REPLACE' | 'POP';

  export type Location = {
    pathname: string,
    search: string,
    hash: string,
    state?: any,
    key?: string,
  };


  export interface RouteProps {
    pattern: string;
    pathname: string;
    exactly: boolean;
    location: Location;
    params: Object;
  }

  export interface RouteRenderFn {
    (props: RouteProps): React.ReactNode | Promise<React.ReactNode>;
  }

  export interface RouteComponent extends React.ComponentClass<RouteProps> {
    props: RouteProps;
  }


  export type HistoryContext = {
    action: Action,
    location: Location,
    push: Function,
    replace: Function,
    go: Function,
    goBack: Function,
    goForward: Function,
    canGo?: Function,
    block: Function,
  }

  export type RouterContext = {
    createHref: () => {},
    transitionTo: () => {},
    replaceWtih: () => {},
    blockTransitions: () => {},
  };


  export interface LinkProps extends React.ClassAttributes<Link> {
    to: string | { pathname: string, query: string };
    replace?: boolean;
    activeStyle?: Object;
    activeClassName?: string;
    activeOnlyWhenExact?: boolean;
    isActive?: Function;
    children?: React.ReactChildren;
    style?: Object;
    className?: string;
    target?: string;
    onClick?: React.MouseEventHandler<any>;
  }

  export interface Link extends React.ComponentClass<LinkProps> {
    props: LinkProps;
  }

  export const Link: Link;


  export interface RouteProps extends React.ClassAttributes<Match> {
    path?: string;
    exactly?: boolean;
    location?: Object;
    children?: React.ReactChild;
    render?: RouteRenderFn;
    component?: React.ReactChild;
  }

  export interface Route extends React.ComponentClass<RouteProps> {
    props: RouteProps;
  }

  export const Route: Route;


  export interface MissProps extends React.ClassAttributes<Miss> {
    location?: Location;
    render?: RouteRenderFn;
    component?: React.ReactNode;
  }

  export interface Miss extends React.ComponentClass<MissProps> {
    props: MissProps;
  }

  export const Miss: Miss;


  export interface NavigationPromptProps extends React.ClassAttributes<NavigationPrompt> {
    when?: boolean;
    message: Function | string;
  }

  export interface NavigationPrompt extends React.ComponentClass<NavigationPromptProps> {
    props: NavigationPromptProps;
  }

  export const NavigationPrompt: NavigationPrompt;


  export interface RedirectProps extends React.ClassAttributes<Redirect> {
    to: string | Object;
    push?: boolean;
  }

  export interface Redirect extends React.ComponentClass<RedirectProps> {
    props: RedirectProps;
  }

  export const Redirect: Redirect;


  export interface BrowserRouterProps extends React.ClassAttributes<BrowserRouter> {
    basename?: string;
    forceRefresh?: boolean;
    getUserConfirmation?: Function;
    keyLength?: number;
    children?: React.ReactChildren;
  }

  export interface BrowserRouter extends React.ComponentClass<BrowserRouterProps> {
    props: BrowserRouterProps;
  }

  export const BrowserRouter: BrowserRouter;


  export interface HashRouterProps extends React.ClassAttributes<HashRouter> {
    basename?: string;
    getUserConfirmation?: Function;
    hashType?: string;
    children?: Function | React.ReactNode;
  }

  export interface HashRouter extends React.ComponentClass<HashRouterProps> {
    props: HashRouterProps;
  }

  export const HashRouter: HashRouter;


  export type ServerRouterContext = {
    getResult: Function,
  };

  export interface ServerRouterProps extends React.ClassAttributes<ServerRouter> {
    basename?: string;
    context: ServerRouterContext;
    location: string;
    children?: React.ReactNode;
  }

  export interface ServerRouter extends React.ComponentClass<ServerRouterProps> {
    props: ServerRouterProps;
  }

  export const ServerRouter: ServerRouter;


  export interface StaticRouterProps extends React.ClassAttributes<StaticRouter> {
    action: Object;
    blockTransitions?: Function;
    children?: React.ReactNode;
    createHref?: Function;
    location: Object | string;
    basename?: string;
    onPush: Function;
    onReplace: Function;
    stringifyQuery?: Function;
    parseQuery?: Function;
  }

  export interface StaticRouter extends React.ComponentClass<StaticRouterProps> {
    props: StaticRouterProps;
  }

  export const StaticRouter;

  export function createServerRenderContext(): ServerRouterContext;
}
