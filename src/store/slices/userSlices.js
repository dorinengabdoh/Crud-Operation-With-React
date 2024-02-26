import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    users: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * Sets the users in the state to the given array of users.
         *
         * @param {PayloadAction<User[]>} action - The payload action containing the array of users.
         */
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        /**
         * Adds a user to the state.
         *
         * @param {PayloadAction<User>} state - The current state.
         * @param {User} action.payload - The user to be added.
         */
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        /**
         * Edit a user in the state.
         *
         * @param {any} state - The current state.
         * @param {PayloadAction<User>} action - The payload action containing the user to edit.
         */
        editUser: (state, action) => {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        /**
         * Deletes a user from the state.
         *
         * @param {string} action.payload - The ID of the user to be deleted.
         */
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
    },
});

export const { setUsers, addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;