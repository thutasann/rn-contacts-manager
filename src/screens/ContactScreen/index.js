import React, { useEffect, useState, useContext, useCallBack } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Icon from '../../components/common/Icon';
import ContactsComponent from '../../components/ContactsComponent';
import Button from '../../components/common/button';
import { GlobalContext } from '../../context/Provider';
import getContacts from '../../context/actions/contacts/getContacts';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ContactScreen = () => {

    const [ sortBy, setSortBy ] = useState(null);
    const { navigate, setOptions, toggleDrawer } = useNavigation();
    const [ modalVisible, setModalVisible ] = useState(false);

    const { 
        contactsDispatch,
        contactsState: {
        getContacts : { data, loading },
    }} = useContext(GlobalContext);

    useEffect(() =>{
        getContacts()(contactsDispatch)
    },[]);


    const getSettings = async () => {
        const sortPref = await AsyncStorage.getItem('sortBy');

        if(sortPref){
            setSortBy(sortPref);
        }
    };

    useFocusEffect(
        useCallBack(() => {
            getSettings();

            return () => {

            }
        }, [])
    );


    // drawerLeft Icon
    useEffect(() => {
        setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() =>{
                    toggleDrawer();
                }}>
                    <Icon
                        type="material" 
                        name="menu" 
                        size={25} 
                        style={{ padding: 10 }}
                    />
                </TouchableOpacity>
            )
        })
    }, []);

    return (
        <ContactsComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            data={data}
            loading={loading}
            sortBy={sortBy}
        />
    )
}

export default ContactScreen


