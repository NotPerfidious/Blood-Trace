/**
 * App Layout Component
 * Serves as the master template for the application, providing a persistent
 * Navbar and Footer while rendering nested routes through the Outlet.
 */
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Outlet } from 'react-router-dom';

function Layout() {

    return (

        <div className='flex flex-col min-h-screen'>
            <Navbar />

            <main className='flex-1 flex flex-col'>
                <Outlet />
            </main>


            <Footer />
        </div>

    )


}
export default Layout;