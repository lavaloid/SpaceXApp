import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, UIManager, Platform, LayoutAnimation, TouchableHighlight, } from 'react-native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

/**
 * An accordion-like component which can be collapsed or expanded.
 * The title of the Summary is passed in using the `title` prop, and
 * the content is the child of the Summary.
 */
export default function Summary(props: any) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <View style={styles.summaryContainer}>
            <TouchableHighlight 
                onPress={() => { 
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setIsCollapsed(!isCollapsed);
                }}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={[styles.dropIcon,
                        { transform: [{ rotate: isCollapsed ? '0deg' : '180deg' }]}
                    ]}>V</Text>
                </View>
            </TouchableHighlight>
            {!isCollapsed && (
                <View style={styles.contentContainer}>
                    {props.children}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {

    },
    dropIcon: {
        fontSize: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        flexGrow: 1,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#eee',
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 7,
    },
    summaryContainer: {
        width: '100%',
    },
});