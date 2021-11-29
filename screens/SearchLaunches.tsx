import * as React from 'react';
import { useState } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { StyleSheet, View, Text, ScrollView, ImageBackground, Button, TextInput, useWindowDimensions, TouchableHighlight, } from 'react-native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

/**
 * Screen for searching rocket launches.
 */
export default function SearchLaunches({ navigation, route }: { navigation: any, route: any }) {
    const [missionName, setMissionName] = useState('');
    const [launchYear, setLaunchYear] = useState('');
    const [sortBy, setSortBy] = useState('launch_date_unix');

    const windowWidth = useWindowDimensions().width;

    return (
        <View style={styles.container}>
            <TextInput style={[styles.searchBar, {width: windowWidth - 40}]} 
                placeholder='Search launches...' onChangeText={(_missionName) => { setMissionName(_missionName) }}/>
            <View style={styles.yearContainer}>
                <Text style={styles.label}>Year launched: </Text>
                <TextInput style={styles.yearInput} keyboardType='number-pad'
                    onChangeText={(_launchYear) => { setLaunchYear(_launchYear) }} />
            </View>
            <Text style={styles.label}>Sort by: </Text>
            <View style={styles.sortByContainer}>
                <TouchableHighlight underlayColor='#555' style={[styles.sortBy,
                    { backgroundColor: (sortBy === 'launch_date_unix') ? '#fff' : '#aaa',
                    borderWidth: (sortBy === 'launch_date_unix') ? 3: 0,
                    borderTopLeftRadius: 10, borderBottomLeftRadius: 10, }
                ]} onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setSortBy('launch_date_unix');
                }}>
                    <Text style={styles.sortByText}>Launch Date</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='#555' style={[styles.sortBy,
                    { backgroundColor: (sortBy === 'mission_name') ? '#fff' : '#aaa',
                    borderWidth: (sortBy === 'mission_name') ? 3: 0,
                    borderTopRightRadius: 10, borderBottomRightRadius: 10, }
                ]} onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setSortBy('mission_name');
                }}>
                    <Text style={styles.sortByText}>Mission Name</Text>
                </TouchableHighlight>
            </View>
            <Button onPress={() => {
                navigation.navigate('Results', {
                    id: route.params.id,
                    missionName: missionName,
                    launchYear: launchYear,
                    sort: sortBy,
                })
            }} title='Search' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 20,
    },
    label: {
        fontSize: 18,
        height: 30,
    },
    searchBar: {
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 10,
        marginRight: 20,
    },
    sortBy: {
        flexGrow: 1,
        justifyContent: 'center',
        borderColor: '#aaa',
    },
    sortByContainer: {
        flex: 1,
        flexDirection: 'row',
        flexGrow: 0,
        minHeight: 40,
        marginBottom: 20,
    },
    sortByText: {
        fontSize: 18,
        textAlign: 'center',
    },
    yearContainer: {
        flex: 1,
        flexDirection: 'row',
        flexGrow: 0,
        alignItems: 'center',
        minHeight: 30,
    },
    yearInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        height: 35,
        width: 100,
    },
});