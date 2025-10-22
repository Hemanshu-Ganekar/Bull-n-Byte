import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {login:false, token:null},
  reducers: {
    setLogin : (state, action) =>{
        state.login = action.payload.login;
        state.token = action.payload.token;
    }}});
export const {setLogin} = authSlice.actions;
export default authSlice.reducer;