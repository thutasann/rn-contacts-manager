import { StyleSheet } from 'react-native';
import colors from '../../asssets/theme/colors';

export default StyleSheet.create({
    logo:{
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginTop: 30
    },
    title:{
        fontSize: 21,
        textAlign: 'center',
        paddingTop: 4,
        fontWeight: 'bold'
    },
    subTitle:{
        fontSize: 17,
        textAlign: 'center',
        paddingVertical: 12,
        fontWeight: '600',
    },
    form:{
        paddingTop: 20
    },
    createAcc:{
        flexDirection: 'row',
        marginTop: 8,
        alignSelf: 'flex-end'
    }, 
    infoText:{
        fontSize: 15,
    },
    linkText:{
        paddingLeft: 5,
        color: colors.primary,
        fontSize: 14,
    },   
});