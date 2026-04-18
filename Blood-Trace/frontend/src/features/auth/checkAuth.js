import { createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../utils/API';

const checkAuth = createAsyncThunk(
    'auth/authProvider',
    async (_, thunkAPI) => {
        try {
          
            const response = await API.get('/me');

            console.log('checkAuth: ', response);
           
            if (response.data.message === 'Authentication successful'){
                return;
            }

            throw Error();
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export default checkAuth;