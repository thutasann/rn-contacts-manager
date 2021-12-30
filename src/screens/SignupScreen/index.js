import React, { useEffect, useState, useContext, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import RegisterComponent from '../../components/Register'
import register, { clearAuthState } from '../../context/actions/auth/register';
import axios from '../../helpers/axiosInterceptor';
import { GlobalContext } from '../../context/Provider';
import { LOGIN } from '../../constants/routeNames';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {

    const { navigate } = useNavigation();
    const [ form, setForm ] = useState({});
    const [ errors, setErrors ] = useState({});

    const { authDispatch, authState: {error, loading, data} } = useContext(GlobalContext);
    
    useFocusEffect(
        useCallback(() => {
            return() =>{
                if(data || error){
                    clearAuthState()(authDispatch);
                }
            }
            
        }, [data, error])
    );

    // onChangeText error
    const onChange = ({ name, value }) =>{
        setForm({...form, [name]: value });
        
        if(value !== ""){
            
            if(name === 'password'){
                if(value.length < 6){
                    setErrors((prev) =>{
                        return{
                            ...prev,
                            [name]: "Password must be 6 characters long"
                        }
                    })
                }
                else{
                    setErrors((prev) => {
                        return {
                            ...prev, [name]: null
                        }
                    })
                }
            }
            else{
                setErrors((prev) =>{
                    return {
                        ...prev,
                        [name]: null
                    }
                })
            }
        }
        else{
            setErrors((prev) =>{
                return {
                    ...prev,
                    [name]: "Please enter this field!"
                }
            })
        }

    };

    const onSubmit = () =>{

        // onSubmit errors
        if(!form.userName){
            setErrors(prev => {
                return {
                    ...prev,
                    userName: "User Name is required!"
                }
            })
        }
        if(!form.firstName){
            setErrors(prev => {
                return{
                    ...prev,
                    firstName: "First Name is required!"
                }
            })
        }
        if(!form.lastName){
            setErrors(prev => {
                return{
                    ...prev,
                    lastName: "Last Name is required!"
                }
            })
        }
        if(!form.email){
            setErrors(prev =>{
                return{
                    ...prev,
                    email: "Email Address is required!"
                }
            })
        }
        if(!form.password){
            setErrors(prev =>{
                return{
                    ...prev,
                    password: "Password is required!"
                }
            })
        }


        // If all of errors are clear
        if(
            Object.values(form).length === 5 &&
            Object.values(form).every((item) => item.trim().length > 0 ) &&
            Object.values(errors).every((item) => !item )
        ){
            register(form)(authDispatch)((response) => {
                navigate(LOGIN, { data: response }); // data is param -> useRoute() will be used in Login screen
            });
        }
    }

    return (
        <RegisterComponent 
            onSubmit={onSubmit} 
            onChange={onChange}
            form={form} 
            errors={errors} 
            error={error} // form authSate
            loading={loading} // form authSate
        />
    )
}

export default SignupScreen

const styles = StyleSheet.create({})
