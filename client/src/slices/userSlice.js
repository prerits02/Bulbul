import { createSlice } from '@reduxjs/toolkit';


const clearInvalidData = () => {
    try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        
        if (token && !JSON.parse(token)) localStorage.removeItem("token");
        if (user && !JSON.parse(user)) localStorage.removeItem("user");
    } catch (e) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
};

clearInvalidData();

const initialState = {
    loading: false,
    signupData: null,
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
        setUser(state, value) {
            state.user = value.payload;
        },
    },
});

export const { setSignupData, setLoading, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;