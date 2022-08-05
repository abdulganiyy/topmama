import React from 'react';
import './App.css';
import {useAppDispatch,useAppSelector} from 'hooks'
import AuthRoutes from 'Components/AuthRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from 'Components/Header'
import {Routes,Route} from 'react-router-dom'
import Register from 'Pages/Register';
import Login from 'Pages/Login';
import Account from 'Pages/Account'
import Users from 'Pages/Users';
import {loadApp} from 'slices/user'


function App() {
  const dispatch = useAppDispatch()

  React.useEffect(()=>{
       dispatch(loadApp()) 
  },[])


  return (
    <>
    <Header />
    <Routes>
      <Route index element={<Register />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route element={<AuthRoutes />} >
      <Route path='account' element={<Account />} />
      <Route path='users' element={<Users />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
