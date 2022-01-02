import React, { useContext, useState, useRef, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native'
import CreateContactComponent from '../../components/CreateContactComponent'
import createContact from '../../context/actions/contacts/createContact';
import { GlobalContext } from '../../context/Provider';
import { CONTACT_DETAIL, CONTACT_LIST } from '../../constants/routeNames';
import countryCodes from '../../utils/countryCodes';
import editContact from '../../context/actions/contacts/editContact';


const CreateContactScreen = () => {


    const { 
        contactsDispatch,
        contactsState:{
            createContact:{ loading, error }
        }
    } = useContext(GlobalContext);

    const [ localFile, setLocalFile ] = useState(null);
    const sheetRef = useRef(null); // bottom sheet image picker
    const [ uploading, setUploading ] = useState(false); // for firebase storage
    const [ form, setForm ] = useState({});
    const { navigate, setOptions } =  useNavigation();
    const { params } = useRoute();

    // For update
    useEffect(() => {

        if(params?.contact){

            setOptions({
                title: "Update Contact"
            });

            const { 
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                is_favorite: isFavorite,
                country_code: countryCode,
            } = params?.contact;

            setForm((prev) =>{
                return {
                    ...prev, 
                    firstName, 
                    lastName, 
                    phoneNumber, 
                    isFavorite, 
                    phoneCode: countryCode
                };
            });

            const country = countryCodes.find((item) =>{
                return item.value.replace("+", '') === countryCode
            });

            if(country){
                setForm((prev) =>{
                    return {
                        ...prev, 
                        countryCode: country.key.toUpperCase()
                    };
                });
            }

        }

        if(params?.contact?.contact_picture){
            setLocalFile(params?.contact?.contact_picture);
        }

    }, []);


    // form's onChangeText
    const onChangeText = ({ name, value }) => {
        setForm({
            ...form,
            [name] : value
        });
    };

    // Form onSubmit
    const onSubmit = () => {
        if(params?.contact){ // from contact detail (params) to edit contact
            editContact(form, params?.contact.id)(contactsDispatch)((item) =>  {
                navigate(CONTACT_DETAIL, {item});
            });
        }
        else{
            createContact(form)(contactsDispatch)(() =>  {
                navigate(CONTACT_LIST);
            });
        }
    };

    // close image picker
    const closeSheet = () =>{
        if(sheetRef.current){
            sheetRef.current.close();
        }
    }

    // open image picker
    const openSheet = () =>{
        if(sheetRef.current){
            sheetRef.current.open();
        }
    }

    // favorite switch
    const toggleValueChange = () =>{
        setForm({
            ...form,
            "isFavorite": !form.isFavorite,
        });
    };

    // Image picker file selected
    const onFileSelected = (image) => {
        closeSheet();
        setLocalFile(image);
    }

    return (
        <CreateContactComponent
            form={form}
            setForm={setForm}
            onChangeText={onChangeText}
            onSubmit={onSubmit}
            loading={loading || uploading}
            error={error}
            toggleValueChange={toggleValueChange}
            sheetRef={sheetRef}
            closeSheet={closeSheet}
            openSheet={openSheet}
            onFileSelected={onFileSelected}
            localFile={localFile}
        />
    )
}

export default CreateContactScreen

