import React, { useState } from 'react'
import { TouchableOpacity, View, Text, TextInput, ActivityIndicator } from 'react-native'
import colors from '../../../asssets/theme/colors'
import styles from './styles'

const Message = ({ onDismiss, retry, retryFn, message, info, success, primary, secondary, danger }) => {

    const [ userDismissed, setUserDismissed ] = useState(false);

    const getBgColor = () =>{
        if(primary){
            return colors.primary;
        }
        if(info){
            return colors.secondary;
        }
        if(danger){
            return colors.danger;
        }
        if(success){
            return colors.success;
        }
    };
    
    return (
        <>
            {
                userDismissed ? null : (
                    <TouchableOpacity style={[styles.wrapper, {backgroundColor: getBgColor()} ]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.white }}>
                                {message}
                            </Text> 

                            {
                                retry && !typeof onDismiss === "function" && (
                                    <TouchableOpacity onPress={retryFn}>
                                        <Text style={{ color: colors.white }}>
                                            Retry
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }

                            {
                                typeof onDismiss ===  "function" && (
                                    <TouchableOpacity onPress={() =>{
                                        setUserDismissed(true);
                                        onDismiss();
                                    }}>
                                        <Text style={{ color: colors.white }}>
                                            X
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </TouchableOpacity>
                )
            }
        </>
    )
}

export default Message;
