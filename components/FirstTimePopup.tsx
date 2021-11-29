import * as React from 'react';
import { StyleSheet, Text, Modal, View, TouchableHighlight, TouchableWithoutFeedback, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function FirstTimePopup() {
    const [showModal, setShowModal] = useState(false);

    // Check whether the user already visited the app
    // and store into `showModal`.
    useEffect(() => {
        const checkIsFirstTime = async () => {
            try {
                const value = await AsyncStorage.getItem('@is_first_time');
                if (value !== null) {
                    setShowModal(value === 'true');
                } else {
                    // If null, then it's the first time
                    setShowModal(true);
                }
            } catch (e) {
                // Error reading value, assume that it's the first time
                setShowModal(true);
            }
        };

        checkIsFirstTime();
    }, [])

    // Once the app is loaded, we can store the fact that the user already
    // visited the app into local storage.
    useEffect(() => {
        const setFirstTime = async () => {
            try {
                await AsyncStorage.setItem('@is_first_time', 'false');
            } catch (e) {
                // Error saving, can be safely ignored
            }
        }

        setFirstTime();
    }, [])


    return (
        <Modal animationType='fade'
            visible={showModal}
            transparent={true}
            onRequestClose={() => {
                setShowModal(false);
            }}>
            <View style={styles.backgroundOverlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome to SpaceXApp!</Text>
                    <Text style={styles.content}>
                        Start reading about SpaceX rockets by pressing one of the rocket names.
                    </Text>
                    <Button title='OK' onPress={() => {
                        setShowModal(false);
                    }}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backgroundOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '95%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    content: {
        fontSize: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});