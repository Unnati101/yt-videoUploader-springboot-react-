
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Home from './components/Home.jsx'
import Login from './pages/login.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Upload from './pages/Upload.jsx'
import { ThemeProvider } from '@emotion/react'
import { darkTheme } from './helper/Theme.js'
import { CssBaseline } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './helper/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='101251863126-1qfduegogr3pnb6u3sdnfu20j9pk2nkj.apps.googleusercontent.com'>
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>

        <CssBaseline />
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path='' element={<Navigate to={'/login'} />} />
            <Route path='/dashboard' element={<Home />}>
            

              <Route path='upload' element={<Upload />} />
              <Route path='list' element={<h1>This is list page</h1>} />

            </Route>


            <Route path='/login' element={<Login />} />

            <Route path='/about' element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
 </GoogleOAuthProvider>
);
