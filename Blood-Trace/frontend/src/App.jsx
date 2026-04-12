import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import RegisterDonor from './pages/RegisterDonor'
import About from './pages/About'
import Notifications from './pages/Notifications'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import Help from './pages/Help'
import AccessibilitySettings from './pages/AccessibilitySettings'
import Profile from './pages/Profile'

function App() {
  useEffect(() => {
    // Apply accessibility settings on load
    const root = document.documentElement;
    const highContrast = localStorage.getItem('accessibility_highContrast') === 'true';
    const reduceMotion = localStorage.getItem('accessibility_reduceMotion') === 'true';
    const textSize = localStorage.getItem('accessibility_textSize') || 'Normal';
    const simplifyUI = localStorage.getItem('accessibility_simplifyUI') === 'true';
    const screenReader = localStorage.getItem('accessibility_screenReader') === 'true';

    if (highContrast) root.classList.add('high-contrast');
    if (reduceMotion) root.classList.add('reduce-motion');
    if (textSize === 'Large') root.style.fontSize = '110%';
    else if (textSize === 'Extra Large') root.style.fontSize = '125%';
    if (simplifyUI) root.classList.add('simplify-ui');
    if (screenReader) root.classList.add('screen-reader-opt');
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route index element={<Landing />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="register-donor" element={<RegisterDonor />} />
            <Route path="about" element={<About />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="help" element={<Help />} />
            <Route path="accessibility" element={<AccessibilitySettings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

