import {createSlice} from '@reduxjs/toolkit'


const initialState  = {
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : 
    null
}


const authSlice = createSlice({
    name : 'auth' ,
    initialState : initialState,
    reducers : {
        setCredentials : (state , action) => {
               let credentials = action.payload
               state.userInfo = credentials
               localStorage.setItem('userInfo' , JSON.stringify(state.userInfo))
        },

        logout : (state , action) =>{
              state.userInfo = null 
              localStorage.removeItem('userInfo')
        },
} 
   
   

})

export {authSlice}
export const {setCredentials , logout} = authSlice.actions