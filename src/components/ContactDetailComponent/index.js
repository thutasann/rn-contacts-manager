import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import ImageComponent from './ImageComponent';
import Icon from '../common/Icon';
import Button from '../common/button';
import ImagePickers from '../common/ImagePicker';
import styles from './styles';
import colors from '../../asssets/theme/colors';
import { CREATE_CONTACTS } from '../../constants/routeNames';
import { DEFAULT_IMAGE_URI } from '../../constants/general';


const ContactDetailComponent = ({ contact, sheetRef, onFileSelected }) => {

    const { navigate } = useNavigation();
    const { contact_picture, first_name, last_name, phone_number, country_code } = contact;

    
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {
                    contact_picture ? (
                        <ImageComponent src={contact_picture} />
                    ):
                    (
                        <Image source={{ uri: DEFAULT_IMAGE_URI  }}  style={{ width: '100%', height: 260, resizeMode: 'cover' }}/>
                    )
                }

                <View style={styles.content}>
                    <Text style={styles.names}>
                        {first_name + ' ' + last_name}
                    </Text>
                </View>

                <View style={styles.hrLine} />

                <View style={styles.topCallOptions}>
                    <TouchableOpacity style={styles.topCallOption}>
                        <Icon
                            type="ionicon"
                            name="call-outline"
                            color={colors.primary}
                            size={27}
                        />
                        <Text style={styles.middleText}>Call</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.topCallOption}>
                        <Icon
                            type="materialCommunity"
                            name="message-text"
                            color={colors.primary}
                            size={27}
                        />
                        <Text style={styles.middleText}>Text</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.topCallOption}>
                        <Icon
                            type="materialCommunity"
                            name="video"
                            color={colors.primary}
                            size={27}
                        />
                        <Text style={styles.middleText}>Video</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.middleCallOptions}>
                    <Icon
                        type="ionicon"
                        name="call-outline"
                        color={colors.grey}
                        size={27}
                    />
                    <View style={styles.phoneMobile}>
                        <Text>{phone_number}</Text>
                        <Text>Mobile</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            type="materialCommunity"
                            name="message-text"
                            color={colors.primary}
                            size={27}
                            style={[styles.msgIcon]}
                        />
                    </View>
                </View>

                <Button
                    style={{ marginHorizontal: 20, marginTop: 20 }}
                    primary
                    title="Edit Contact"
                    onPress={() => {
                        navigate(CREATE_CONTACTS, {contact, editing: true});
                    }}
                />
            </View>

            <ImagePickers 
                onFileSelected={onFileSelected} 
                ref={sheetRef} 
            />

        </ScrollView>
    )
}

export default ContactDetailComponent
