import * as React from 'react';
import { StyleSheet, View, ActivityIndicator, } from 'react-native';

export default function LoadingIndicator() {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#2233ff'/>
        </View>
    );
}

const styles =  StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});