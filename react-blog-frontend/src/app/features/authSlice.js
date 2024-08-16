import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        setTokens: (state, action) => {
            const newTokens = action.payload;
            state.accessToken = newTokens.accessToken;
            state.refreshToken = newTokens.refreshToken;

            localStorage.setItem('accessToken', newTokens.accessToken);
            localStorage.setItem('refreshToken', newTokens.refreshToken);
        },
        clearTokens: (state) => {
            state.accessToken = null
            state.refreshToken = null
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    }
})

export const {setTokens, clearTokens} = authSlice.actions;
export default authSlice.reducer;