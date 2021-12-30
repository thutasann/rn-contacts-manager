import React, { useState } from 'react'
import { TouchableOpacity, View, Text, TextInput, ActivityIndicator } from 'react-native'
import colors from '../../../asssets/theme/colors'
import styles from './styles'

const Button = ({ onPress, title, secondary, primary, danger, disabled, loading }) => {

    const getBgColor = () =>{
        if(disabled){
            return colors.grey;
        }
        if(primary){
            return colors.primary;
        }
        if(secondary){
            return colors.secondary;
        }
        if(danger){
            return colors.danger;
        }
    };
    
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.wrapper, {backgroundColor: getBgColor()} ]}>
            <View style={[styles.loaderSection]}>
                {
                    loading && <ActivityIndicator color={primary? colors.secondary : colors.primary} />
                }
                { 
                    title && (
                        <Text style={{ color: disabled? "black" : colors.white, paddingLeft: loading ? 5: 0 }}>
                            {loading? "Please wait ..." : title}
                        </Text> 
                    )
                }
            </View>
            
        </TouchableOpacity>
    )
}

export default Button
