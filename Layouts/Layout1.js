import Header from "@/Components/Header"
import Sidebar from "@/Components/Sidebar"
import Footer from "@/Components/Footer"


const Layout1 = ({children}) => {



  return (
    <div className="Container">
        <Header /> 

            <div className="Inner">
                <Sidebar />
                <main className="home">
                    {children}
                </main>
            </div>

       <Footer />
    </div>
  )
}

export default Layout1
