import { Outlet } from 'react-router-dom'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout