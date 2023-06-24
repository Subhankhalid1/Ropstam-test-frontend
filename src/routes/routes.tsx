// Public Routes
import Login from '../pages/Login'
import Register from '../pages/Register'

// Private Routes
import Dashboard from '../pages/Dashboard'
import Categories from '../pages/Categories'
import Cars from '../pages/Cars'
import UpdateProfile from '../pages/UpdateProfile'

export const routesConstant = {
  // Public Routes
  LOGIN: '/login',
  REGISTER: '/register',
  NOT_FOUND: '*',
  // Private Routes
  DASHBOARD: '/dashboard',
  CATEGORIES: '/categories',
  CARS: '/cars',
  UPDATE_PROFILE: '/updateProfile',
  HOME: '/',
}

export const PublicRoutes = [
  { path: routesConstant.LOGIN, component: <Login /> },
  { path: routesConstant.REGISTER, component: <Register /> },
  { path: routesConstant.NOT_FOUND, component: <Login /> },
]

export const PrivateRoutes = [
  { path: routesConstant.DASHBOARD, component: <Dashboard /> },
  { path: routesConstant.CATEGORIES, component: <Categories /> },
  { path: routesConstant.CARS, component: <Cars /> },
  { path: routesConstant.UPDATE_PROFILE, component: <UpdateProfile /> },
  { path: routesConstant.HOME, component: <Dashboard /> },
  { path: routesConstant.NOT_FOUND, component: <Dashboard /> },
]
