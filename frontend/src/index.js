import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css'; 
import './assets/styles/bootstrap.custom.css'
import {createBrowserRouter , Route , createRoutesFromElements, RouterProvider} from 'react-router-dom'
import App from './App';
import {Provider} from 'react-redux'
import store from './store';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App></App>}> 

    <Route index={true} path='/' element={<HomeScreen/>}/>

    <Route path='/products/:id' element={<ProductScreen/>}/>

    <Route path='/cart' element={<CartScreen/>}/>
    
    <Route path='/login' element={<LoginScreen/>}/> 

    <Route path='/register' element={<RegisterScreen/>}/> 

    // right now we are setting up this route straightforward, but we have to set this, with some other approach, as we dont want to visit this route, without login, so keeping in view this, we have to set the route in such a way that we can not access shipping route without login

// following are the Private Routes

     <Route path='' element={<PrivateRoute></PrivateRoute>}>

     <Route path='/shipping' element={<ShippingScreen/>}/> 


    </Route >



    </Route> 
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
   <RouterProvider router={router}></RouterProvider>
   </Provider>
  </React.StrictMode>
);

reportWebVitals();
