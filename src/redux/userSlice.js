import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice ({
    name : "user",
    initialState :{
        users: {
            user: null,
            isFetching: false,
            error: false
        },
        profiles: {
            profile: null,
            loading: false,
            error: false
        }
    },
    reducers: {
        // getUsersStart: (state) => {
        //     state.users.isFetching = true;  
        // },
        // getUsersSuccess: (state, action) => {
        //     state.users.isFetching = false;  
        //     state.users.user = action.payload;
        // },
        // getUsersFailed: (state) => {
        //     state.users.isFetching = false; 
        //     state.users.error = true; 
        // },
        updateStart: (state) => {
            state.profiles.loading = true; 
        },
        updateSuccess: (state, action) => {
            state.profiles.loading = false;  
            state.profiles.profile = action.payload;
        },
        updateFailed: (state) => {
            state.profiles.loading = false; 
            state.profiles.error = true; 
        },
        getDataSuccess: (state, action) => {
            state.profiles.profile = action.payload;
            state.profiles.loading = false;
            state.profiles.error = false;
        },
    }
})

export const {
    // getUsersStart,
    // getUsersSuccess, 
    // getUsersFailed,
    updateStart,
    updateSuccess, 
    updateFailed,
    getDataSuccess,
} = userSlice.actions; 
export default userSlice.reducer;

