import React,{useState,useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import { Row,Col,Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAppSelector } from 'hooks';
import axios from 'axios';

const Landing = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const user = useAppSelector(state => state.user.currentUser)

    useEffect(()=>{
        const fetchUserAccount = async () =>{

          try {

            const response = await axios.get(`https://reqres.in/api/users/${user.id}`)

            setEmail(response.data.data.email)
            setFirstName(response.data.data.first_name)
            setLastName(response.data.data.last_name)
            
          } catch (error) {
             console.log(error)
          }
       
        }

        fetchUserAccount()
    },[])


  

    const onSubmitHandler = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        try {

          await axios.patch(`https://reqres.in/api/users/${user.id}`)

          window.location.reload();

          
        } catch (error) {
           console.log(error)
        }
    }

    const onChangeEmailHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value)
    }

    const onChangeFirstNameHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setFirstName(e.target.value)
    }

    
    const onChangeLastNameHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
      setLastName(e.target.value)
  }


  return (
    <> 
    <Container className='pt-4' >
        <Row>
        <Col md={{offset:4,span:4}}>
      <Form onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={onChangeEmailHandler} value={email} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>First Name</Form.Label>
        <Form.Control onChange={onChangeFirstNameHandler} value={firstName} type="text" placeholder="First Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Last Name</Form.Label>
        <Form.Control onChange={onChangeLastNameHandler} value={lastName} type="text" placeholder="Last Name" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Button variant="primary" type="submit">
        Save
      </Button>
      </Form.Group>
      
    </Form>
    </Col>
    </Row>
    </Container>
    </>
  ) 
}

export default Landing