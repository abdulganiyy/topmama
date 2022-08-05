import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";

import axios from 'axios'



type User =
{
    id: number,
    token:string
}

type loginData = {
    email:string,
    password:string
}

type registerData = {
    email:string,
    password:string
}



export const login = createAsyncThunk(
    "user/login", async (data:loginData) => {
      try {

        const response = await axios.post('https://reqres.in/api/login',data)

        localStorage.setItem('user',JSON.stringify(response.data))

        return response.data


     
      } catch (err) {
        console.log(err)
          //rejectWithValue(err.error)
      }
    });


    export const register = createAsyncThunk(
        "user/register", async (data:registerData) => {
          try {
    
            const response = await axios.post('https://reqres.in/api/register',data)

            localStorage.setItem('user',JSON.stringify(response.data))
    
            return response.data
         
          } catch (err:any) {
            console.log(err.response.data.error)
              //rejectWithValue(err.error)
          }
        });
    

   
type StateType = {
    currentUser:User,
    loading:boolean,
    error:string
}

const initialState:StateType={
    currentUser:{
        id:-1,
        token:''
    },
    loading:false,
    error:''
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logout:(state)=>{

            localStorage.removeItem('user') 
            state.currentUser =  {
                id:-1,
                token:''
            }
        },
        loadApp:(state)=>{
            const user = localStorage.getItem('user') 

            if(!user){
                state.currentUser =  {
                    id:-1,
                    token:''
                }
            }else{
                state.currentUser = JSON.parse(user)
            }
            
            
        }
      
    },
    extraReducers: builder => {
        builder.addCase(login.pending, state => {
          state.loading = true
        })
        builder.addCase(
          login.fulfilled,
          (state, action:PayloadAction<User>) => {
            state.loading = false
            state.currentUser = action.payload
            state.error = ''
          }
        )
        builder.addCase(login.rejected, (state, action) => {
          state.loading = false
          state.error = action.error.message || 'Something went wrong'
        })
        builder.addCase(register.pending, state => {
            state.loading = true
          })
          builder.addCase(
            register.fulfilled,
            (state, action:PayloadAction<User>) => {
              state.loading = false
              state.currentUser = action.payload
              state.error = ''
            }
          )
          builder.addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
          })
      }
})


const reducer = userSlice.reducer

const {logout,loadApp} = userSlice.actions


export default reducer

export {logout,loadApp}