import React, { useContext, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { GlobalContext } from '../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from './SideMenu/RootNavigator';

const AppNavContainer = () => {

    const { authState: {isLoggedIn} } = useContext(GlobalContext);
    console.log("isLoggedIn =>", isLoggedIn);

    // Reading from AsyncStorage
    const [ isAuthenticated, setIsAuthenticated ] = useState(isLoggedIn);
    const [ authLoaded, setAuthloaded ] = useState(false);

    const getUser = async () => {
        try {
            const user = await AsyncStorage.getItem("user");

            if(user){
                setAuthloaded(true);
                setIsAuthenticated(true);
            }
            else{
                setAuthloaded(true);
                setIsAuthenticated(false);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getUser();
    }, [isLoggedIn]);

    console.log("isAuthenticated ==>", isAuthenticated);


    return (
        <>
            {
                authLoaded ?(
                    <NavigationContainer ref={navigationRef}>
                        {
                            isAuthenticated ? <DrawerNavigator/> : <AuthNavigator/>
                        }
                    </NavigationContainer>
                )
                : (
                    <ActivityIndicator/>
                )
                
            }
        </>
    )
}

export default AppNavContainer;