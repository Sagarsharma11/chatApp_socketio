const {createSlice} = require('@reduxjs/toolkit')
const initialState = []

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        add(state,action){
            console.log(action,'action')
            state[0] = action.payload
        },
        fetchUser(state,action){
            console.log(action,'action user data')
            state[0] = action.payload
        },
      

    }
})  

export const {add,chatUser,fetchUser} = userSlice.actions;
export default userSlice.reducer; 