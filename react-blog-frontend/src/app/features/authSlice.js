import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: JSON.parse(localStorage.getItem('userObject')) || null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        setTokens: (state, action) => {
            const newData = action.payload;
            state.accessToken = newData.access;
            state.refreshToken = newData.refresh;
            state.user = newData.user;

            localStorage.setItem('accessToken', newData.access);
            localStorage.setItem('refreshToken', newData.refresh);
            if(newData.user) {
                localStorage.setItem('userObject',JSON.stringify(newData.user));
            }
        },
        clearTokens: (state) => {
            state.accessToken = null
            state.refreshToken = null
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem('userObject')
        },
        updateUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('userObject',JSON.stringify(action.payload));
        }
    },
})

export const {setTokens, clearTokens, updateUser} = authSlice.actions;
export default authSlice.reducer;