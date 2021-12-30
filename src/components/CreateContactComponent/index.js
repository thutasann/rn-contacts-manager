import React, { useState, useEffect } from 'react'
import { View, Text, Image, Switch, TouchableOpacity } from 'react-native';
import Container from '../common/Container';
import Input from '../common/input';
import Button from '../common/button';
import styles from './styles';
import CountryPicker from 'react-native-country-picker-modal'
import { DEFAULT_IMAGE_URI } from '../../constants/general';
import colors from '../../asssets/theme/colors';
import ImagePickers from '../common/ImagePicker';

// error => error from backend

const CreateContactComponent = ({ toggleValueChange, loading, error, setForm, onSubmit, onChangeText, form, sheetRef, openSheet, localFile, onFileSelected }) => {
    return (
        <View style={styles.container}>
            <Container style={{ paddingTop: 5 }}>

                <Image
                    widht={150}
                    height={150}
                    source={{ uri: localFile?.uri || DEFAULT_IMAGE_URI }}
                    style={styles.imageView}
                />
                
                <TouchableOpacity onPress={openSheet}>
                    <Text style={styles.chooseText}>Choose image</Text>
                </TouchableOpacity>
                
                <Input
                    label="First Name"
                    placeholder="Enter First name"
                    onChangeText={(value) => {
                        onChangeText({
                            name: "firstName",
                            value: value
                        })
                    }}
                    error={error?.first_name?.[0]}
                />
                <Input
                    label="Last Name"
                    placeholder="Enter Last name"
                    onChangeText={(value)=> {
                        onChangeText({
                            name: "lastName",
                            value: value
                        })
                    }}
                    error={error?.last_name?.[0]}
                />

                <Input
                    icon={
                        <CountryPicker
                            withFilter
                            withFlag
                            countryCode={form.countryCode || undefined} // otherwise -> undefined
                            withCountryNameButton={false}
                            withCallingCode
                            withCallingCodeButton
                            withEmoji
                            onSelect={(v) => {
                                const phoneCode = v.callingCode[0];
                                const cCode = v.cca2;

                                setForm({
                                    ...form,
                                    phoneCode,
                                    countryCode: cCode
                                })
                            }}
                        />
                    }
                    keyboardType="numeric"
                    label="Phone Number"
                    placeholder="Enter Phone number"
                    iconPosition="left"
                    style={{ paddingLeft: 10 }}
                    onChangeText={(value) => {
                        onChangeText({
                            name: "phoneNumber",
                            value: value
                        })
                    }}
                    error={error?.phone_number?.[0]}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                    <Text style={{ fontSize: 17 }}>
                        Add to Favorite
                    </Text>
                    <Switch
                        trackColor={{ false: colors.grey, true: colors.primary }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleValueChange}
                        value={form.isFavorite}
                    />
                </View>
                
                <Button
                    onPress={onSubmit}
                    primary
                    title="Create Contact"
                    loading={loading}
                    disabled={loading}
                />
            </Container>

            <ImagePickers
                ref={sheetRef}
                onFileSelected={onFileSelected}
            />
        </View>
    )
}

export default CreateContactComponent
