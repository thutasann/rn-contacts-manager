import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Button from '../common/button';
import Container from '../common/Container'
import Input from '../common/input';
import styles from './styles';
import {LOGIN} from '../../constants/routeNames';
import Message from '../common/Message';

// error => error from state  (backend),
// errors => validations errors

const RegisterComponent = ({ onSubmit, onChange, form, loading, error, errors }) => {

    const { navigate } = useNavigation();
    const [ isSecureEntry, setIsSecureEntry ] = useState(true);

    return (
        <Container>

            <Image
                source={require('../../asssets/images/logo.png')}
                style={styles.logo}
            />

            <View>

                <Text style={styles.title}>Welcome to Contacts Manager</Text>
                <Text style={styles.subTitle}>Create a free account</Text>

                <View style={styles.form}>
                    
                    {
                        error?.error &&(
                            <Message
                                retry
                                danger
                                retryFn={() => {
                                    console.log(`222`, 222)
                                }}
                                message={error?.error}
                            />
                        )
                    }

                    <Input 
                        label="Username"
                        iconPosition="right"
                        plaecholder="Enter Username"
                        error={errors.userName || error?.username?.[0]}
                        onChangeText={(value) =>{
                            onChange({
                                name: "userName",
                                value
                            })
                        }}
                    />

                    <Input 
                        label="First name"
                        iconPosition="right"
                        plaecholder="Enter First name"
                        onChangeText={(value) =>{
                            onChange({
                                name: "firstName",
                                value
                            })
                        }}
                        error={errors.firstName || error?.first_name?.[0]}
                    />

                    <Input 
                        label="Last name"
                        iconPosition="right"
                        plaecholder="Enter Last name"
                        onChangeText={(value) => {
                            onChange({
                                name: "lastName",
                                value
                            })
                        }}
                        error={errors.lastName || error?.last_name?.[0]}
                    />

                    <Input 
                        label="Email"
                        iconPosition="right"
                        plaecholder="Enter Email Address"
                        onChangeText={(value) =>{
                            onChange({
                                name: "email",
                                value
                            })
                        }}
                        error={errors.email || error?.email?.[0]}
                    />

                    <Input 
                        label="Password"
                        icon={<TouchableOpacity onPress={() => {
                            setIsSecureEntry((prev) => !prev)
                        }}>
                            <Text>{isSecureEntry ? "Show" : "Hide"}</Text>
                        </TouchableOpacity>}
                        iconPosition="right"
                        placeholder="Enter Password"
                        secureTextEntry={isSecureEntry}
                        onChangeText={(value) =>{
                            onChange({
                                name: "password",
                                value
                            })
                        }}
                        error={errors.password || error?.password?.[0]}
                    />
                    <Button
                        title="Register"
                        primary
                        onPress={onSubmit}
                        loading={loading}
                        disabled={loading}
                    />

                    <View style={styles.createAcc}>
                        <Text style={styles.infoText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => {
                            navigate(LOGIN);
                        }}>
                            <Text style={styles.linkText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            
            </View>

        </Container>
    )
}

export default RegisterComponent
