import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css'; 
import './assets/styles/bootstrap.custom.css'
import {createBrowserRouter , Route , createRoutesFromElements, RouterProvider} from 'react-router-dom'
import App from './App';
import {Provider} from 'react-redux'
import store from './store';
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoute from './components/AdminRoute';
import OrderListScreen from './screens/Admin/OrderListScreen';
import ProductListScreen from './screens/Admin/ProductListScreen';
import UpdateProductScreen from './screens/Admin/UpdateProductScreen';
import UserListScreen from './screens/Admin/UserListScreen';

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
     <Route path='/payment' element={<PaymentScreen/>}/> 
     <Route path='/placeorder' element = {<PlaceOrderScreen/>}></Route>
     <Route path='/order/:orderId' element={<OrderScreen></OrderScreen>}></Route>
     <Route path='/profile' element={<ProfileScreen></ProfileScreen>}></Route>


    </Route >

// admin routes
    <Route path='' element={<AdminRoute></AdminRoute>}>

      <Route path ='/admin/orderlist' element={<OrderListScreen></OrderListScreen>}></Route>
      <Route path ='/admin/productlist' element={<ProductListScreen></ProductListScreen>}></Route>
      <Route path ='/admin/product/:id/edit' element={<UpdateProductScreen></UpdateProductScreen>}></Route>
      <Route path ='/admin/userlist' element={<UserListScreen/>}></Route>



    </Route>

    </Route> 
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
   <RouterProvider router={router}></RouterProvider>
   </PayPalScriptProvider> 
   </Provider>
  </React.StrictMode>
);

reportWebVitals();
