
/*
Readme
==============================================================================================================

import { useDispatch, useSelector } from "react-redux"
import { changeTheme, removeUser } from "@/store/slices/constantSlice"

! To get Data
const data = useSelector((state) => state.users) // state.users, the slice name is from index.js i.e. store
const dark = useSelector(state => state.dark) // state.dark, the slice name is from index.js i.e. store

! To send data
const dispatch = useDispatch()
onClick={() => dispatch(changeTheme(!dark))}
onClick => {() => dispatch(removeUser(elem))}

*/
import { createSlice } from "@reduxjs/toolkit";

// Using slice reducers as a function to update state
const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        addUser(state, action) {
            state.push(action.payload)
        },
        removeUser(state, action) {
            state.splice(action.payload, 1)
        },
        deleteUsers(state, action) {
            return []
        }
    },
    // extraReducers(builder){
    // need to export same and here it is dependent to userSlice
    //     builder.addCase(userSlice.actions.deleteUsers, () => {
    //         // extra logic here...
    //     })
    // }

    // extraReducers(builder){
    // no need to export when it's on actions and not independent now.
    // and now you will import on component from actions
    // builder.addCase(deleteUsers, () => {
    // extra logic here...
    //     })
    // }

})

// Using slice reducer as a state
export const dark = createSlice({
    name: 'dark',
    initialState: true,
    reducers: {
        changeTheme(state, action) {
            return action.payload;
        }
    }
})

// Export dispatcher here
export const { addUser, removeUser, deleteUsers } = userSlice.actions;
export const { changeTheme } = dark.actions;