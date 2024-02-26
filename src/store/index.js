import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/userSlices';

const store = configureStore({
    reducer: {
        users: usersReducer
    },
    devTools: true
});



export default store;