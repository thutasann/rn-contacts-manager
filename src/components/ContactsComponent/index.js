import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import colors from '../../asssets/theme/colors';
import Container from '../common/Container';
import Icon from '../common/Icon';
import Message from '../common/Message';
import styles from './styles';
import { CREATE_CONTACTS } from '../../constants/routeNames';

const ContactsComponent = ({ modalVisible, data, loading, setModalVisible, sortBy }) => {
    
    const { navigate } = useNavigation()

    const ListEmptyComponent = () =>{
        return (
            <View style={{ paddingHorizontal: 89, paddingVertical: 100 }}>
                <Message
                    info
                    message="No contacts to show"
                />
            </View>
        )
    };

    const renderItem = ({item}) => {
        console.log(`item`, item);

        const { contact_picture, first_name, last_name, phone_number, country_code } = item;

        return(
            <TouchableOpacity style={styles.itemContainer}>
                <View style={styles.item}>
                    {
                        contact_picture ? (
                            <Image source={{ uri: contact_picture }} style={{ width: 45, height: 45, borderRadius: 100 }} />
                        ) : (
                            <View style={{ borderRadius: 100,flexDirection: 'row', justifyContent: 'center', alignItems:'center', width: 45, height: 45, backgroundColor: colors.grey }}>
                                <Text style={styles.name}>{first_name[0]}</Text>
                                <Text style={styles.name}>{last_name[0]}</Text>
                            </View>
                        )
                    }

                    <View style={{ paddingLeft: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.name, {color: "#000"}]} >
                                {first_name}{' '}
                            </Text>
                            <Text style={[styles.name, {color: "#000"}]} >
                                {last_name}
                            </Text>
                        </View>
                        <Text style={styles.phone}>
                            {`+`} {`${country_code} ${phone_number}`}
                        </Text>
                    </View>
                </View>

                <Icon
                    name="right"
                    type="ant"
                    size={18}
                    color={colors.grey}
                />
            </TouchableOpacity>
        )
    }
    
    return (
        <>
            <View sytle={{ backgroundColor: colors.white }}>

                {
                    loading && (
                        <View style={{ paddingVertical: 100, paddingHorizontal: 100 }}>
                            <ActivityIndicator 
                            size="large" 
                            color={colors.primary}
                        />
                        </View>
                    )
                }

                {
                    !loading && (
                        <View style={{ paddingVertical:20 }}>
                            <FlatList
                                renderItem={renderItem}
                                data={sortBy ? data.sort((a,b) => {

                                    if(sortBy === "First Name"){
                                        if(b.first_name > a.first_name){
                                            return -1;
                                        }
                                        else{
                                            return 1;
                                        }
                                    }

                                    if(sortBy === "Last Name"){
                                        if(b.last_name > a.last_name){
                                            return -1;
                                        }
                                        else{
                                            return 1;
                                        }
                                    }

                                }) : data}
                                ItemSeparatorComponent={() => (
                                    <View style={{ height: 0.5, backgroundColor: colors.grey }}></View>
                                )}
                                keyExtractor={(item) => String(item.id)}
                                ListEmptyComponent={ListEmptyComponent}
                                ListFooterComponent={() => (
                                    <View style={{ height: 150 }}></View>
                                )}
                            />
                        </View>
                    )
                }
                
            </View>

            <TouchableOpacity 
                style={styles.floatingBtn}
                onPress={() => {
                    navigate(CREATE_CONTACTS)
                }}
            >
                <Icon
                    size={21}
                    type="ant"
                    name="plus"
                    color={colors.white}
                />
            </TouchableOpacity>
        </>
    )
}

export default ContactsComponent;
