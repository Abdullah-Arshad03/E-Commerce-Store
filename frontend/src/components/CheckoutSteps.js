import React from "react";
import { Nav, NavItem , NavLink} from "react-bootstrap";
import { LinkContainer} from "react-router-bootstrap";


const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
     <Nav className="justify-content-center mb-4">

        <NavItem>

        {step1 ? (<>
        <LinkContainer to='/login'>
            <NavLink className="text-dark"> <span style={{color: 'black', fontWeight: '500'}} > Sign in </span></NavLink>
        </LinkContainer>
       </>) : (<>
       <NavLink  className="text-dark" aria-disabled>Sign in</NavLink>
       </>) }
       </NavItem>

     

       <NavItem>
       {step2 ? (<>
        <LinkContainer to='/shipping'>
            <NavLink className="text-dark"> <span style={{color: 'black', fontWeight: '500'}} > Shipping </span></NavLink>
        </LinkContainer>
       </>) : (<>
       <NavLink  className="text-dark" aria-disabled >Shipping</NavLink>
       </>) }
       </NavItem>

       <NavItem>

       {step3 ? (<>
        <LinkContainer to='/payment'>
            <NavLink className="text-dark"> <span style={{color: 'black', fontWeight: '500'}} > Payment </span></NavLink>
        </LinkContainer>
       </>) : (<>
       <NavLink  className="text-dark" aria-disabled>Payment</NavLink>
       </>) }
       </NavItem>


       <NavItem>
       {step4 ? (<>
        <LinkContainer to='/placeorder'>
            <NavLink > <span style={{color: 'black', fontWeight: '500'}} > Place Order </span></NavLink>
        </LinkContainer>
       </>) : (<>
       <NavLink  className="text-dark" aria-disabled>Place Order</NavLink>
       </>) }
       </NavItem>

       
            </Nav>
   </>
  );
};


export default CheckoutSteps
