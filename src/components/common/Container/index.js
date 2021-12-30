import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container = ({ style, children }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.wrapper, style]}>
                    { children }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Container;

