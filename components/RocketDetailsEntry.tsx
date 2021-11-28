import * as React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

/**
 * RocketDetailsEntry allows you to show the key and value for
 * an information. The key is passed in with the `name` prop and
 * the value is passed in with the `value` prop.
 */
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