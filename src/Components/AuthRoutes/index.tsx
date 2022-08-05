import React from 'react'
import {  Navigate, Outlet } from 'react-router-dom'
import {useAppSelector} from 'hooks'

type AuthRoutesPropTypes = {
    children?:React.ReactNode
}

const AuthRoutes = ({children}:AuthRoutesPropTypes) => {
 const token = useAppSelector(state => state.user.currentUser.token)

 if(!token) {
    return <Navigate to={'/register'} replace />
 }

  return (
    <>
    {children ? children : <Outlet />}
    </>
  )
}

export default AuthRoutes