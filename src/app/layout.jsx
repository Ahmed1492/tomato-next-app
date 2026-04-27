import './globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StoreContextProvider from '@/context/StoreContext'
import { Suspense } from 'react'
import PageLoader from '@/components/PageLoader'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata = {
  title: 'Food Flow - Order Your Favourite Food',
  description: 'Order delicious food online with fast delivery. Browse menus, save favorites, and track your orders.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Food Flow - Order Your Favourite Food',
    description: 'Order delicious food online with fast delivery.',
    images: ['/logo.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreContextProvider>
          <Suspense fallback={null}>
            <PageLoader />
          </Suspense>
          <Suspense fallback={null}>
            <ScrollToTop />
          </Suspense>
          <ToastContainer position="top-right" autoClose={2500} />
          {children}
        </StoreContextProvider>
      </body>
    </html>
  )
}
