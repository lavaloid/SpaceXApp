import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, Text, TextInput, useWindowDimensions } from "react-native";

/**
 * Component for rocket items in the home screen.
 */
export default function RocketItem (props: any) {
    const [isTouched, setIsTouched] = useState(false);
    const backgroundColor = isTouched ? '#ddd' : '#fff';

    return (
        <View style={[styles.itemContainer,
            {backgroundColor: backgroundColor}]}
            onTouchStart={() => {setIsTouched(true)}}
            onTouchEnd={() => {setIsTouched(false)}}
            onTouchCancel={() => {setIsTouched(false)}}>
            <View style={styles.itemContentContainer}>
                <Text style={styles.itemTitle}>
                    {props.name}
                </Text>
                <Text style={styles.itemContent}>
                    {props.country}
                </Text>
            </View>
            <Text style={styles.gotoIcon}>&gt;</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 7,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    itemContentContainer: {
        flexGrow: 1,
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemContent: {
        fontSize: 16,
    },
    gotoIcon: {
        fontSize: 45,
    },
});