import React from 'react'
import { View, Alert, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Container from '../../components/common/Container';
import { SETTINGS } from '../../constants/routeNames';
import logoutUser from '../../context/actions/auth/logoutUser';
import styles from './styles';
import Icon from '../../components/common/Icon';


const SideMenu = ({navigation, authDispatch}) => {
    
    const handleLogout = () =>{
        navigation.toggleDrawer();
        Alert.alert("Logout!", "Are you sure you want to logout?", [
            {
                text: "Cancel",
                onPress: () => {}
            },
            {
                text: "OK",
                onPress: () => {
                    logoutUser()(authDispatch);
                }
            }
        ]);
    };

    const menuOptions = [
        {
            icon: <Icon type="fontisto" name="player-settings" size={17} />,
            name: "Settings",
            onPress: () =>{
                navigation.navigate(SETTINGS)
            }
        },
        {
            icon: <Icon type="material" name="logout" size={17} />,
            name: "Logout",
            onPress: handleLogout,
        }
    ];


    return (
        <SafeAreaView>
            <Container>
                <Image
                    source={require('../../asssets/images/logo.png')}
                    style={styles.logo}
                />

                <View style={styles.itemWrapper}>
                    {
                        menuOptions.map(({name, icon, onPress}) => (
                            <TouchableOpacity onPress={onPress} style={styles.item} key={name}>
                                {icon}
                                <Text style={styles.itemText}>
                                    {name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </Container>
        </SafeAreaView>
    )

}

export default SideMenu
