import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '../../components/common/Icon';
import ContactsComponent from '../../components/ContactsComponent';
import Button from '../../components/common/button';
import { GlobalContext } from '../../context/Provider';
import getContacts from '../../context/actions/contacts/getContacts';


const ContactScreen = () => {

    const { setOptions, toggleDrawer } = useNavigation();
    const [ modalVisible, setModalVisible ] = useState(false);

    const { 
        contactsDispatch,
        contactsState: {
        getContacts : { data, loading },
    }} = useContext(GlobalContext);

    useEffect(() =>{
        getContacts()(contactsDispatch)
    },[]);

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
        />
    )
}

export default ContactScreen


