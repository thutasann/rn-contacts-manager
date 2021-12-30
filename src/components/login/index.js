import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Button from '../common/button';
import Container from '../common/Container'
import Input from '../common/input';
import styles from './styles';
import {REGISTER} from '../../constants/routeNames';
import Message from '../common/Message';

const LoginComponent = ({ form, justSignedUp, loading, onChange, onSubmit, error }) => {

    const { navigate } = useNavigation();
    const [isSecureEntry, setIsSecureEntry] = useState(true);

    return (
        <Container>

            <Image
                source={require('../../asssets/images/logo.png')}
                style={styles.logo}
            />

            <View>

                <Text style={styles.title}>Welcome to Contacts Manager</Text>
                <Text style={styles.subTitle}>Please Login Here</Text>

                <View style={styles.form}>


                    {
                        justSignedUp && (
                            <Message
                                onDismiss={() => {}}
                                success
                                message="Account created successfully!"
                            />
                        )
                    }

                    {
                        // not local error
                        error && !error.error && (
                            <Message
                                onDismiss={() => {}}
                                danger
                                message="Invalid Creditentials!!"
                            />
                        )
                    }

                    {
                        error?.error && (
                            <Message
                                message={error?.error}
                                danger
                                onDismiss
                            />
                        ) // maybe unable to connect to the server ^^
                    }

                    <Input 
                        value={form.userName || null}
                        label="Username"
                        iconPosition="right"
                        placeholder="Enter Username"
                        onChangeText={(value) => {
                            onChange({
                                name: 'userName', value
                            });
                        }}
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
                        onChangeText={(value) => {
                            onChange({
                                name: 'password', value
                            })
                        }}
                    />

                    <Button
                        title="Submit"
                        primary
                        onPress={onSubmit}
                        disabled={loading}
                        loading={loading}
                    />

                    <View style={styles.createAcc}>
                        <Text style={styles.infoText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => {
                            navigate(REGISTER);
                        }}>
                            <Text style={styles.linkText}>Register</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            
            </View>

        </Container>
    )
}

export default LoginComponent
