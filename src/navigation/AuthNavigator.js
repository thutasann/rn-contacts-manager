import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { LOGIN, REGISTER } from '../constants/routeNames';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';



const AuthNavigator = () => {

    const AuthStack = createNativeStackNavigator();

    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name={LOGIN} component={LoginScreen} />
            <AuthStack.Screen name={REGISTER} component={SignupScreen} />
        </AuthStack.Navigator>
    )
}

export default AuthNavigator;
