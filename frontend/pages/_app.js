import '../styles/globals.css'
import localFont from '@next/font/local'
import Nav from '../components/nav'

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../public/ivymode-light.woff2' })

export default function App({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
    <Nav />
    <Component {...pageProps} />
  </main>
  )
}
