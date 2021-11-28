import * as React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

export default function RocketDetailsEntry(props: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.entryKey}>{props.name}</Text>
            <Text style={styles.entryValue}>{props.value}</Text>
        </View>
    );
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    entryKey: {
        flexGrow: 1,
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    entryValue: {
        fontSize: 15,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
});