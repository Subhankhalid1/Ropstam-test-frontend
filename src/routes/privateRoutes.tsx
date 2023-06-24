import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../common/helpers/api_helper'
import Header from '../components/layout/header'

const ProtectedRoutes: FC = () => {
  const isAuthenticated = getToken()
  // Navigate to Login screen if user is not logged in
  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }
  // Privately accessible routes
  return (
    <>
      <Header />
      <Outlet />;
    </>
  )
}
export default ProtectedRoutes
