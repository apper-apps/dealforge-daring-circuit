import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Homepage from '@/components/pages/Homepage'
import Browse from '@/components/pages/Browse'
import DealDetail from '@/components/pages/DealDetail'
import Cart from '@/components/pages/Cart'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="browse" element={<Browse />} />
          <Route path="deal/:id" element={<DealDetail />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  )
}

export default App