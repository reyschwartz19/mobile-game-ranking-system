import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Authentication from './pages/authentication.jsx';
import Dashboard from './pages/dashboard.jsx';
import Confirm from './pages/confirmationPage.jsx';
import { AuthContextProvider } from './context/Authcontext.jsx';
import ProvideRoute from './pages/PrivateRoute.jsx';
import AuthCallback from './pages/AuthCallback.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Authentication/>
  },
  {
    path: '/dashboard',
    element:  <Dashboard/> 
  },{
    path: '/confirm',
    element: <Confirm/>
  },
  {
    path: '/auth/callback',
    element: <AuthCallback/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <AuthContextProvider>
       <RouterProvider router={router} />
    </AuthContextProvider>
   </>
 
  </StrictMode>,
)
