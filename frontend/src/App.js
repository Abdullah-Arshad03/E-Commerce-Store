import React from "react";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import Footer from "./components/Footer";
import { Outlet} from 'react-router-dom'

const App = () =>{
  return (<>

  <Header/>
  <main className="py-3">
    <Container>
      <Outlet></Outlet>
   </Container>
  </main>
  <Toaster/>
  <Footer/>
 
  
  </>)
}

export default App