import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
import checkAuth from './features/auth/checkAuth'
import { fetchAccessibilitySettings, resetAccessibility } from './features/accessibility/accessibilitySlice'
import LoadingPulse from './components/LoadingPulse'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

function App() {

  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  const accessibility = useSelector((state) => state.accessibility);

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAccessibilitySettings());
    } else {
      dispatch(resetAccessibility());
    }
  }, [isAuthenticated, dispatch]);


  useEffect(() => {
    // Apply accessibility settings globally when they change in Redux
    const root = document.documentElement;
    const { highContrast, reduceMotion, textSize, simplifyUI, screenReader } = accessibility;

    if (highContrast) root.classList.add('high-contrast');
    else root.classList.remove('high-contrast');

    if (reduceMotion) root.classList.add('reduce-motion');
    else root.classList.remove('reduce-motion');

    if (textSize === 'Large') root.style.fontSize = '110%';
    else if (textSize === 'Extra Large') root.style.fontSize = '125%';
    else root.style.fontSize = '100%';

    if (simplifyUI) root.classList.add('simplify-ui');
    else root.classList.remove('simplify-ui');

    if (screenReader) root.classList.add('screen-reader-opt');
    else root.classList.remove('screen-reader-opt');
  }, [accessibility]);

  if (loading) {
    return <LoadingPulse />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="about" element={<About />} />
            <Route path="help" element={<Help />} />
            <Route element={<ProtectedRoute />}>

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="register-donor" element={<RegisterDonor />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<Profile />} />
              <Route path="accessibility" element={<AccessibilitySettings />} />

              <Route element={<AdminRoute />}>
                <Route path="admin" element={<AdminDashboard />} />
              </Route>

            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

