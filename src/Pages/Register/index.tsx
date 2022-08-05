import React,{useState} from 'react'
import Container from 'react-bootstrap/Container';
import { Row,Col,Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useAppSelector, useAppDispatch } from 'hooks';
import { register } from 'slices/user';
import ButtonLink from 'Components/ButtonLink';
import { Navigate } from 'react-router-dom';


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()
    const {token} = useAppSelector(state => state.user.currentUser)

    const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        dispatch(register({email,password}))
    }

    const onChangeEmailHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value)
    }

    const onChangePasswordHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value)
    }

  return (
    <> 
    {token && <Navigate to={'/account'} />}
    <Container className='pt-4' >
        <Row>
        <Col md={{offset:4,span:4}}>
      <Form onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={onChangeEmailHandler} value={email} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={onChangePasswordHandler} value={password} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group as={Stack} direction='horizontal' gap={3} className="mb-3" >
        <Button variant="primary" type="submit">
        Register
      </Button>
      <div>Already signed up <ButtonLink variant='link' to='/login'>Login</ButtonLink></div>
      
      </Form.Group>
      
    </Form>
    </Col>
    </Row>
    </Container>
    </>
  ) 
}

export default Register