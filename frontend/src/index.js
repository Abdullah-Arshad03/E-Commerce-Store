import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css'; 
import './assets/styles/bootstrap.custom.css'
import { createBrowserRouter , createRoutesFromElements, Route , Router , RouterProvider  } from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './screens/HomeScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App></App>}> // this Route, takes an element of an entire app

    // that true index mean that if we are just on / only homescreen should be rendered strictly, no other clash with any other route
      <Route index={true} path='/'  element={<HomeScreen></HomeScreen>}/>


    </Route>

  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
