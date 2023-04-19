const {createSlice} = require('@reduxjs/toolkit')
const initialState = []

const chatuserSlice = createSlice({
    name: 'chatuser',
    initialState,
    reducers:{
        chatUser(state,action){
            state[0] = action.payload
        },
    }
})  

export const {chatUser} = chatuserSlice.actions;
export default chatuserSlice.reducer; 