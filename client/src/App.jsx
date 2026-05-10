import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/MainLayout'
import PageLoader from './components/PageLoader'

const Home        = lazy(() => import('./pages/Home'))
const ConvertTool = lazy(() => import('./pages/ConvertTool'))
const About       = lazy(() => import('./pages/About'))
const Donate      = lazy(() => import('./pages/Donate'))
const Contact     = lazy(() => import('./pages/Contact'))
const Privacy     = lazy(() => import('./pages/Privacy'))
const Terms       = lazy(() => import('./pages/Terms'))
const NotFound    = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
          },
          success: { iconTheme: { primary: '#6172f3', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#f43f5e', secondary: '#fff' } },
        }}
      />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/"        element={<Home />} />
            <Route path="/convert" element={<ConvertTool />} />
            <Route path="/about"   element={<About />} />
            <Route path="/donate"  element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms"   element={<Terms />} />
            <Route path="*"        element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
