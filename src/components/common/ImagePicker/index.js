import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../../asssets/theme/colors';
import Icon from '../../common/Icon';
import styles from './styles.js';
import * as ImagePicker from 'expo-image-picker';


const ImagePickers = React.forwardRef(({onFileSelected}, ref) => {


    // Image picker
    const pickImage = async () => {
        
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                onFileSelected(result);
            }
        } catch (error) {
            console.log("PickImage Error =>", error)
        }

    };

    // Open Camera
    const openCamera = async () => {
        try {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

            if (permissionResult.granted === false) {
                Alert.alert("You've refused to allow this appp to access your camera!");
                return;
            }

            const result = await ImagePicker.launchCameraAsync();

            if (!result.cancelled) {
                onFileSelected(result);
            }
        } 
        catch (error) {
            console.log("Open Camera Error =>", error)
        }
    }


    const options = [
        {
            name: "Take from camera",
            icon: <Icon name="camera" color={colors.grey} size={21} />,
            onPress: openCamera,
        },
        {
            name: "Choose from Gallery",
            icon: <Icon name="image" color={colors.grey} size={21} />,
            onPress: pickImage,
        },
    ]

    return (
        <RBSheet
            ref={ref}
            height={180}
            openDuration={250}
            closeOnDragDown
            customStyles={{ 
                container:{
                    borderTopLeftRadius:  20,
                    borderTopRightRadius: 20,
                }
            }}
        >
            <View style={styles.pickercontainer}>
                {
                    options.map(({ name, icon, onPress }) => (
                        <TouchableOpacity onPress={onPress} style={styles.pickerOption} key={name}>
                            {icon}
                            <Text style={styles.text}>{name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </RBSheet>
    );
});

export default ImagePickers

// ImagePicker.openPicker({
//     width: 300,
//     height: 300,
//     cropping: true,
//     freeStyleCropEnabled: true,
// }).then((images) => {
//     onFileSelected(images);
// }).catch((error)=>{
//     console.log(`error`, error)
// });