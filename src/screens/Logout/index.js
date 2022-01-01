import React, { useContext, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import logoutUser from '../../context/actions/auth/logoutUser';
import { GlobalContext } from '../../context/Provider';

const LogoutScreen = () => {

    const {authDispatch} = useContext(GlobalContext);

    useEffect(() => {
        logoutUser()(authDispatch);
    }, []);

    return <ActivityIndicator />;

}

export default LogoutScreen
