import Layout1 from "@/Layouts/Layout1"
import Layout2 from "@/Layouts/Layout2"
import '@/styles/main.css'
import { SessionProvider } from "next-auth/react"


export default function App(props) {

  const { Component, pageProps } = props

  const layouts = {
    'L1': Layout1,
    'L2': Layout2
  }


  const Layout = layouts[Component.layout]

  return(
    <>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </SessionProvider>
    </>
  )
}
