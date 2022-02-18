import '../styles/globals.css'
import Header from '../components/Header'
import PageWrapper from '../components/PageWrapper'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return <><Header/> <PageWrapper><Component {...pageProps} /></PageWrapper> <Footer/></>
}

export default MyApp
