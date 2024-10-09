import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



// create actions
export const createUser = createAsyncThunk( "createUser", async(data, {rejectWithValue})=>{

    const response = await fetch("https://66fc303cc3a184a84d166424.mockapi.io/crud",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(data)
    })

    try{
        const result = await response.json()
        return result
    }
    catch(error){
        return rejectWithValue(error)
    }

})


// Read Actions

export const showUser = createAsyncThunk("showUser", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("https://66fc303cc3a184a84d166424.mockapi.io/crud");

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Throw an error if response is not 2xx
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message); // Return the error message for better clarity
    }
});


// Delete Action
export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://66fc303cc3a184a84d166424.mockapi.io/crud/${id}`,{
            method: "DELETE",
        });

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Throw an error if response is not 2xx
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message); // Return the error message for better clarity
    }
});


// update actions
export const updateUser = createAsyncThunk( "updateUser", async(data, {rejectWithValue})=>{

    const response = await fetch(`https://66fc303cc3a184a84d166424.mockapi.io/crud/${data.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(data)
    })

    try{
        const result = await response.json()
        return result
    }
    catch(error){
        return rejectWithValue(error)
    }

})


export const userDetail = createSlice({
    name: "userDetail",
    initialState:{
        users: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createUser.pending, (state)=>{
            state.loading = true
        })
        .addCase(createUser.fulfilled, (state,action)=>{
            state.loading = false
            state.users.push(action.payload)
        })
        .addCase(createUser.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(showUser.pending, (state)=>{
            state.loading = true
        })
        .addCase(showUser.fulfilled, (state,action)=>{
            state.loading = false
            state.users = (action.payload)
        })
        .addCase(showUser.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(deleteUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading = false
            const {id} = action.payload
            if(id){
                state.users = state.users.filter((ele)=> ele.id !== id)
            }
            console.log('deleteUser', action.payload);
            
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(updateUser.pending, (state)=>{
            state.loading = true
        })
        .addCase(updateUser.fulfilled, (state,action)=>{
            state.loading = false
            state.users = state.users.map((ele)=>{
               if( ele.id === action.payload.id ){
                return action.payload
               }
               return ele
            })
        })
        .addCase(updateUser.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }

})

export default userDetail.reducer