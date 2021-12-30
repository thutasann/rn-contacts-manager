import React, { createContext,useReducer } from 'react';
import authInitialState from './initialStates/authInitialState';
import contactInitialState from './initialStates/contactInitialState';
import auth from './reducers/auth';
import contacts from './reducers/contact';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) =>{

    const [authState, authDispatch] = useReducer(auth, authInitialState);
    const [contactsState, contactsDispatch] = useReducer(contacts, contactInitialState);

    return (
        <GlobalContext.Provider 
            value={{ authState, contactsState, authDispatch, contactsDispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;


// authSate => current state, authDispatch=> function to dispatch