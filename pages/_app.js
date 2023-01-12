import '../styles/globals.scss';
import NProgress from 'nprogress'
import { Router } from 'next/router';

export default function App({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false, easing: 'ease', speed: 800, trickleSpeed: 1500, trickleRate: 0.005 })
  Router.events.on('routeChangeStart', (url) => {
    NProgress.start()
  })
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
  
  return <Component {...pageProps} />
}
