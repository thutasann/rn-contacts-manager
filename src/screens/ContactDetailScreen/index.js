import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ContactDetailComponent from '../../components/ContactDetailComponent';
import Icon from '../../components/common/Icon';
import colors from '../../asssets/theme/colors';

const ContactDetailScreen = () => {

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
                            
                            <TouchableOpacity style={{ paddingLeft: 10, }}>
                                <Icon 
                                    color={colors.grey}
                                    name="delete"
                                    size={21} 
                                    type="material" 
                                />
                            </TouchableOpacity>
                        </View>
                    );
                },
            });
        }
    }, [item]);

    return (    
        <ContactDetailComponent
            contact={item}
        />
    )
}

export default ContactDetailScreen

const styles = StyleSheet.create({})
