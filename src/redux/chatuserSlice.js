const {createSlice} = require('@reduxjs/toolkit')
const initialState = []

const chatuserSlice = createSlice({
    name: 'chatuser',
    initialState,
    reducers:{
        chatUser(state,action){
            console.log(action,'action user data')
            state[0] = action.payload
        },
    }
})  

export const {chatUser} = chatuserSlice.actions;
export default chatuserSlice.reducer; 