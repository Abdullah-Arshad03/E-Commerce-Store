import {createSlice} from '@reduxjs/toolkit'


const initialState  = {
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : 
    null
}


const authSlice = createSlice({
    name : 'api' ,
    initialState : initialState,
    reducers : {
        setCredentials : (state , action) => {
               let credentials = action.payload
               state.userInfo = credentials
               localStorage.setItem('userInfo' , state.userInfo)
        }
}})

export {authSlice}

export const {setCredentials} = authSlice.actions