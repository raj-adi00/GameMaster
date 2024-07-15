import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedin: false,
    userData: null,
    isFlipped:false
};
// console.log(1)
const authslice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            userenter(state, action) {
                state.loggedin = true;
                state.userData = action.payload
            },
            userout(state) {
                state.loggedin = false;
                state.userData = null;
            },
            updateRating(state, action) {
                state.userData = action.payload
                state.loggedin=true;
            },
            setisFlipped(state){
                 state.isFlipped=!state.isFlipped
            }
        },
    }
);

export const { userenter, userout, updateRating,setisFlipped } = authslice.actions;
export default authslice.reducer;