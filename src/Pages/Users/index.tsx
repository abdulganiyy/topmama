import React,{useState,useEffect} from 'react'
import { Container,Row,Col,Stack,Button,Modal,Form } from 'react-bootstrap'
import axios from 'axios'
import { set } from 'immer/dist/internal'


type UserData = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

const Users = () => {
   const [pageNumber, setPageNumber] = useState(1)
   const [pages, setPages] = useState(0)
   const [users, setUsers] = useState<UserData[]>([])
   const [show, setShow] = useState(false);
   const [name, setName] = useState('')
   const [job, setJob] = useState('')
   const [activeId,setActiveId] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = (id:number) => { 
    
    setActiveId(id)
    setShow(true);}

    useEffect(()=>{
          const fetchUsers = async () =>{
            try {

                const response = await axios.get(`https://reqres.in/api/users/?page=${pageNumber}`)

                setUsers(response.data.data)
                setPages(response.data.total_pages)
                
            } catch (error) {
                console.log(error)
            }
          }

          fetchUsers()
    },[pageNumber])


    const goToPage = (num:number) => {
        setPageNumber(num)
    }

    const deleteUser = (id:number) => {
       const currentUsers = users.filter(user => user.id !== id)

       setUsers(currentUsers)
    }

    const onEditHandler = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        axios.patch(`https://reqres.in/api/users/${activeId}`).then(()=>{
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        })



    }

    const onChangeNameHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value)
        
    }

    const onChangeJobHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setJob(e.target.value)
    }


  return (
    <>
    <Container className={'pt-4'}>
        <Row>
            <Col>
            {users.map((user) => {
                return <Stack key={`${user.id}`} className={'mb-4'} direction={'horizontal'} gap={3}>
                  <span>{user.first_name}</span>
                  <span>{user.last_name}</span>
                  <Button  onClick={()=>handleShow(user.id)} variant="secondary">Edit</Button>
                  <Button onClick={()=>deleteUser(user.id)} variant='danger'>Delete</Button>
                </Stack>
            })}
            </Col>
        </Row>
        <Stack direction={'horizontal'} gap={3}>{Array(pages).fill(null).map((_, i) => <Button key={i} onClick={()=>goToPage(i+1)}>{i+1}</Button>)}</Stack>
    </Container>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={onEditHandler}>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={onChangeNameHandler} value={name} type="name" placeholder="Enter name" />
    
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Job Title</Form.Label>
        <Form.Control onChange={onChangeJobHandler} value={job} type="text" placeholder="Job Title" />
      </Form.Group>
      <Button variant="primary" type='submit' >
            Save Changes
          </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Users