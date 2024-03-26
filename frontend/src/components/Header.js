import React from "react";
import {Badge ,Navbar , Container , Nav, NavbarBrand, NavbarToggle, NavbarCollapse, NavDropdown} from 'react-bootstrap'
import {  FaShoppingCart , FaUser} from 'react-icons/fa'
import logo from '../assets/styles/logo.png'
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/authApiSlice";
import { useNavigate } from "react-router-dom";
import { toast , ToastContainer } from "react-toastify";
import { logout , setCredentials } from "../slices/authSlice";


const Header = () =>{

   

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutCall , {isLoading }] = useLogoutMutation()

    const logoutHandler = async() =>{

        try {
          
            const res = await logoutCall().unwrap()
            console.log('this is the res', res)
            dispatch(logout())
            navigate('/login')


        } catch (error) {
            console.log(error)

            
        }
    }

      const { cartItems } = useSelector((state)=> state.cart )
      const { userInfo } = useSelector((state)=> state.auth)


      console.log(cartItems)
    return(<>
    <ToastContainer></ToastContainer>
    <header>
    <Navbar  bg="dark" variant="dark" expand='md' collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
            <Navbar.Brand >
                <span><img src={logo} alt="E-ProStore" /></span>
                E-ProStore</Navbar.Brand>
                </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <LinkContainer to='/cart'>
                <Nav.Link>  
                <span style={{color: 'white'}}>   <FaShoppingCart/> Cart</span>
                    {
                        cartItems.length > 0 ? (<>
                        <Badge pill bg="white" text="dark" style={{ marginLeft : '5px'}}>
                         {
                            cartItems.reduce((a,c)=> Number(a) + Number(c.qty) , 0)
                         }
                        </Badge>
                        </>) : (<></>)
                    }
                    </Nav.Link>
                </LinkContainer>

                {userInfo? (<>
                
                
                <NavDropdown  title={userInfo.name} id='username'>
                    <LinkContainer to ="profile">
                        
                    <NavDropdown.Item eventKey="profile">Profile</NavDropdown.Item>
                    
                    </LinkContainer>
                    <NavDropdown.Item eventKey="logout" onClick={logoutHandler}>logout</NavDropdown.Item>

                </NavDropdown>
            
                
                </>) : (<>
                    <LinkContainer to='/login'>
                
                <Nav.Link href="/login" > <span style={{color: 'white'}}> <FaUser/> Sign In </span></Nav.Link>
               
                </LinkContainer>
                </>)}


                {userInfo && userInfo.isAdmin ? (<>
                <NavDropdown title='Admin'>

                    <LinkContainer to = '/admin/productlist'>
                    <NavDropdown.Item>
                        Products
                    </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to = '/admin/userlist'>
                    <NavDropdown.Item>
                        Users
                    </NavDropdown.Item>
                    </LinkContainer> <LinkContainer to = '/admin/orderlist'>
                    <NavDropdown.Item>
                        Orders
                    </NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
                
                </>) : (<></>)}
               
                </Nav>
                
            </Navbar.Collapse>

        </Container>
    </Navbar>
    </header>
    </>)
}
export default Header