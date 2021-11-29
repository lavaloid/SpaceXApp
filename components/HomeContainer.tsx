import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, ImageBackground, Text, TextInput, useWindowDimensions } from "react-native";
/**
 * The header for the home screen. Contains the title card and a search bar.
 * Also has a rocket launch as a background.
 */
const HomeHeader = () => {
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    return (
        <View style={[styles.titleContainer,
            {height: windowHeight * 0.35}]}>
            <ImageBackground
                source={require('../assets/images/title-header.jpg')}
                style={styles.titleBackgroundImg}
            >
                <Text style={styles.title}>Read about SpaceX rockets.</Text>
            </ImageBackground>
        </View>
    );
};

/**
 * Container for the home screen content.
 */
export default function HomeContainer (props: any) {
    return (
        <View style={styles.container}>
            <HomeHeader />
            {props.children}
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    title: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        marginHorizontal: 30,
        marginTop: 25,
    },
    titleBackgroundImg: {
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    titleContainer: {
        width: '100%',
        justifyContent: 'center',
    },
})