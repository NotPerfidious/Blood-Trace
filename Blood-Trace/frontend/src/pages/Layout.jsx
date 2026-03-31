import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Outlet } from 'react-router-dom';

function Layout() {

    return (

        <div className='flex flex-col min-h-screen'>
            <Navbar />

            <main className='flex-1'>
                <Outlet />
            </main>


            <Footer />
        </div>

    )


}
export default Layout;