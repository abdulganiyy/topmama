import React,{useState,useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ButtonLink from 'Components/ButtonLink';
import { useAppSelector,useAppDispatch } from 'hooks';
import { Button,Stack } from 'react-bootstrap';
import { logout } from 'slices/user';


  

const Header = () => {
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const user = useAppSelector(state => state.user.currentUser)
    const dispatch = useAppDispatch()

     
    const onLogout = () => {
        dispatch(logout())
    }
      
    useEffect(()=>{
        const getUserLocation =  () =>{
  
          try {
  
             if(window.navigator){
               window.navigator.geolocation.getCurrentPosition((position) =>{
                setLat(position.coords.latitude)
                setLng(position.coords.longitude)
               })
             
             }
            
          } catch (error) {
             console.log(error)
          }
       
        }
  
        getUserLocation()
    },[])


  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Top Mama</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user.token ? <>
            <ButtonLink variant='link' to='/account'>Account</ButtonLink>
            <ButtonLink variant='link' to='/users'>Users</ButtonLink> 
            <Button onClick={()=> onLogout()} variant='danger'>Log out</Button>
            <Stack className='pt-2 px-4'>Current location latitude:{lat} longitude:{lng}</Stack>
            </> 
            :<>
            <ButtonLink variant='link' to='/register'>Register</ButtonLink>
            <ButtonLink variant='link' to='/login'>Login</ButtonLink></>}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  )
}

export default Header