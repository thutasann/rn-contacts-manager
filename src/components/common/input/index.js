import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import colors from '../../../asssets/theme/colors'
import styles from './styles'

const Input = ({ label, icon, iconPosition, onChangeText, style, value, error, ...props }) => {
    
    const [focused, setFocused] = useState(false);

    // To change the input icon position left or right
    const geteFlexDirection = () =>{
        if(icon && iconPosition){
            if(iconPosition === "left"){
                return "row";
            }
            else if (iconPosition === "right"){
                return "row-reverse";
            }
        }
    }

    // To change borderColor if there is an error and Foucs or not
    const getBorderColor = () =>{
        if(error){
            return colors.danger;
        }
        if(focused){
            return colors.primary;
        }
        else{
            return colors.grey;
        }
    };
    
    
    return (
        <View style={styles.inputContainer}>
            { label && <Text>{label}</Text> }

            <View style={[
                    styles.wrapper, 
                    {alignItems: icon ? "center" : "baseline"},
                    { 
                        borderColor: getBorderColor(), 
                        flexDirection: geteFlexDirection() 
                    } 
            ]}>
                
                <View>{icon && icon}</View>
                <TextInput 
                    style={[styles.textInput, style]}
                    onChangeText={onChangeText}
                    value={value}
                    onFocus={()=>{
                        setFocused(true);
                    }}
                    onBlur={() =>{
                        setFocused(false);
                    }}
                    {...props}
                />

            </View>

            { error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

export default Input
