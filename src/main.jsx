import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import 'animate.css'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './Components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='collection'>
      <ErrorBoundary errorMsg="Oops! Sounds not good.">
        <Suspense fallback={<div className='h-screen w-screen flex flex-col items-center justify-center bg-gray-800'>
          <span class="loader"></span>
          <span className='text-white italic font-medium mt-4'>Looking for...</span>
        </div>}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
