import { StyleSheet } from "react-native";
import colors from "../../../asssets/theme/colors";

export default StyleSheet.create({

    inputContainer:{
        paddingVertical: 12
    },
    textInput:{
        flex: 1,
        width: '100%'
    },
    wrapper:{
        height: 42,
        paddingHorizontal: 5,
        paddingVertical: 13,
        borderRadius: 4,
    },
    error:{
        color: colors.danger,
        paddingTop: 4,
        fontSize: 12,
    }
});