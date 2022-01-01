import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../../asssets/theme/colors';
import AppModal from '../common/AppModal';
import Container from '../common/Container';
import Icon from '../common/Icon';
import styles from './styles';

const SettingComponent = ({ prefArr, modalVisible, setModalVisible, settingsOptions}) => {
    return (

        <>

            <AppModal
                closeOnTouchOutside={false}
                modalVisible={modalVisible}
                modalFooter={<></>}
                modalBody={<View>
                    {
                        prefArr.map(({ name, selected, onPress}) => (
                            <View>
                                <TouchableOpacity onPress={onPress} style={{ paddingVertical: 7, flexDirection: 'row', alignItems: 'center' }}>
                                    {selected && <Icon type="material" name="check" size={17} />}
                                    <Text style={{ fontSize: 17, paddingLeft: selected ? 15: 30 }}>{name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>}
                title="Sort By"
                setModalVisible={setModalVisible}        
            />

            <ScrollView style={{ backgroundColor: colors.white }}>
                {
                    settingsOptions.map(({title, subTitle, onPress}, index) => (
                        <TouchableOpacity key={title} onPress={onPress}>
                            <View style={{ 
                                paddingHorizontal: 20,
                                paddingVertical: 20,   
                            }}>
                                <Text style={{ 
                                    fontSize: 17,
                                }}>{title}</Text>
                                {subTitle && <Text style={{ 
                                    fontSize: 14, opacity: 0.6, paddingTop: 5
                                }}>{subTitle}</Text>}
                            </View>

                            <View style={{ height: 0.5, backgroundColor: colors.grey }} />
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>

        </>
    )
}

export default SettingComponent
