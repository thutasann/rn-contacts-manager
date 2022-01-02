import React, { useContext, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import ContactDetailComponent from '../../components/ContactDetailComponent';
import Icon from '../../components/common/Icon';
import colors from '../../asssets/theme/colors';
import { GlobalContext } from '../../context/Provider';
import deleteContact from '../../context/actions/contacts/deleteContact';
import { navigate } from '../../navigation/SideMenu/RootNavigator';
import { CONTACT_LIST } from '../../constants/routeNames';

const ContactDetailScreen = () => {

    const {
    contactsDispatch,
        contactsState: {
            deleteContact: {loading},
        },
    } = useContext(GlobalContext);

    const { params: {item = {}} = {} } = useRoute();

    const { setOptions } = useNavigation();

    useEffect(() =>{
        if(item){
            setOptions({
                title: item.first_name + " " + item.last_name,
                headerRight: () =>{
                    return(
                        <View style={{ flexDirection: 'row', paddingRight: 10, }}>
                            <TouchableOpacity>
                                <Icon 
                                    color={colors.grey}
                                    name={item.is_favorite ? "star" : "star-border"} 
                                    size={21} 
                                    type="material" 
                                />
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={{ paddingLeft: 20, }} onPress={() =>{
                                
                                Alert.alert("Delete!", "Are you sure you want to delete " + item.first_name, [
                                    {
                                        text: "Cancel",
                                        onPress: () => {}
                                    },
                                    {
                                        text: "Delete",
                                        onPress: () => {
                                            deleteContact(item.id)(contactsDispatch)(() =>{
                                                navigate(CONTACT_LIST);
                                            });
                                        }
                                    }
                                ]);
                            }}>
                                {
                                    loading ? (
                                        <ActivityIndicator size="small" color={colors.primary} />
                                    ): (
                                        <Icon 
                                            color={colors.grey}
                                            name="delete"
                                            size={21} 
                                            type="material" 
                                        />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                    );
                },
            });
        }
    }, [item, loading]);

    return (    
        <ContactDetailComponent
            contact={item}
        />
    )
}

export default ContactDetailScreen

const styles = StyleSheet.create({})
