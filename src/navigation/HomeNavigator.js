import React from 'react'
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CONTACT_DETAIL, CONTACT_LIST, CREATE_CONTACTS, LOGOUT, SETTINGS } from '../constants/routeNames';
import ContactScreen from '../screens/ContactScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';
import CreateContactScreen from '../screens/CreateContactScreen';
import SettingScreen from '../screens/SettingScreen';
import LogoutScreen from '../screens/Logout';


const HomeNavigator = () => {

    const HomeStack = createNativeStackNavigator();

    return (
        <HomeStack.Navigator initialRouteName={CONTACT_LIST}>
            <HomeStack.Screen name={CONTACT_LIST} component={ContactScreen}/>
            <HomeStack.Screen name={CONTACT_DETAIL} component={ContactDetailScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name={CREATE_CONTACTS} component={CreateContactScreen} options={{ title: "Create Contact" }} />
            <HomeStack.Screen name={SETTINGS} component={SettingScreen} />
            <HomeStack.Screen name={LOGOUT} component={LogoutScreen} />
        </HomeStack.Navigator>
    )
}

export default HomeNavigator;
