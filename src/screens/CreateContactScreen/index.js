import React, { useContext, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native'
import CreateContactComponent from '../../components/CreateContactComponent'
import createContact from '../../context/actions/contacts/createContact';
import { GlobalContext } from '../../context/Provider';
import { CONTACT_LIST } from '../../constants/routeNames';


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
    const { navigate } = useNavigation();


    // form's onChangeText
    const onChangeText = ({ name, value }) => {
        setForm({
            ...form,
            [name] : value
        });
    };

    // Form onSubmit
    const onSubmit = () => {
        createContact(form)(contactsDispatch)(() =>  {
            navigate(CONTACT_LIST);
        })
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

