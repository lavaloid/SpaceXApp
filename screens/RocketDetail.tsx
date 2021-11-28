import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, ImageBackground, Button, Linking, } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import LoadingIndicator from '../components/LoadingIndicator';
import Summary from '../components/Summary';
import RocketDetailsEntry from '../components/RocketDetailsEntry';

// TODO: Put this gigantic query into its own file
const ROCKET_DETAIL_QUERY = gql`
    query GetRocketDetail ($rocketId: ID!) {
        rocket(id: $rocketId) {
            active
            company
            cost_per_launch
            country
            description
            engines {
                propellant_1
                propellant_2
                thrust_sea_level {
                    kN
                    lbf
                }
                thrust_vacuum {
                    kN
                    lbf
                }
            }
            diameter {
                meters
                feet
            }
            first_flight
            height {
                feet
                meters
            }
            id
            mass {
                kg
                lb
            }
            name
            success_rate_pct
            wikipedia
        }
    }
`;

// Unfortunately, this is the best method I can find to fetch an image of the rocket.
// The `rocket` table doesn't have any images itself, the launches are the ones that
// have images.
const ROCKET_IMAGE_QUERY = gql`
    query GetRocketImages ($rocketId: String) {
        launches(find: {rocket_id: $rocketId}) {
            links {
                flickr_images
            }
        }
    }
`;

/**
 * The content of the detail screen. Includes loading and error handling.
 */
const RocketDetailLoader = (props: any) => {
    const { data: rocket, error: rocketError, loading: rocketLoading } = useQuery(ROCKET_DETAIL_QUERY, {
        variables: {
            rocketId: props.id,
        },
    });
    const { data: images, error: imagesError, loading: imagesLoading } = useQuery(ROCKET_IMAGE_QUERY, {
        variables: {
            rocketId: props.id,
        },
    });

    // Handle loading
    if (rocketLoading || imagesLoading) {
        return (
            <LoadingIndicator />
        );
    }

    // Handle errors
    if (rocketError) {
        return (
            <View>
                <Text>ROCKET ERROR: {rocketError.message}</Text>
            </View>
        );
    }
    if (imagesError) {
        return (
            <View>
                <Text>IMAGE ERROR: {imagesError.message}</Text>
            </View>
        );
    }

    // === CONVERTING DATA TO BE USABLE ===

    // Find available launch images
    let imageLink: string = '';

    // We loop through each launch data to find the first available image.
    if (images.launches !== undefined) {
        for (let launch of images.launches) {
            if (launch.links.flickr_images.length > 0) {
                imageLink = launch.links.flickr_images[0];
                break;
            }
        }
    }

    // === RENDERING ===
    return (
        <ScrollView style={styles.detailContainer}>
            <ImageBackground
                source={imageLink === '' ?
                    require('../assets/images/title-header.jpg') :
                    { uri: imageLink }}
                style={styles.backgroundImg}
            >
                <View style={styles.rocketHeaderContainer}>
                    <Text style={[styles.rocketName, styles.rocketHeaderText]}>{rocket.rocket.name}</Text>
                    <Text style={[styles.rocketCountry, styles.rocketHeaderText]}>{rocket.rocket.country}</Text>
                    <Text style={[styles.rocketDescription, styles.rocketHeaderText]}>{rocket.rocket.description}</Text>
                    <Button title='Read More'
                        onPress={() => { Linking.openURL(rocket.rocket.wikipedia); }}
                        color='#6688ff' />
                    <Button title='View images'
                        onPress={() => { }}
                        color='#555555' />
                    <Button title='Search launches'
                        onPress={() => { }}
                        color='#22aa55' />
                </View>
            </ImageBackground>
            <Summary title='Launch statistics'>
                <RocketDetailsEntry name='Company' value={rocket.rocket.company} />
                <RocketDetailsEntry name='Currently active' value={rocket.rocket.active ? 'Yes' : 'No'} />
                <RocketDetailsEntry name='First launch' value={rocket.rocket.first_flight} />
                <RocketDetailsEntry name='Success rate' value={rocket.rocket.success_rate_pct + '%'} />
                <RocketDetailsEntry name='Cost per launch' value={'$' + rocket.rocket.cost_per_launch} />
            </Summary>
            <Summary title='Architecture'>
                <RocketDetailsEntry name='Diameter' value={
                    rocket.rocket.diameter.meters + 'm / ' +
                    rocket.rocket.diameter.feet + 'ft'} />
                <RocketDetailsEntry name='Height' value={
                    rocket.rocket.height.meters + 'm / ' +
                    rocket.rocket.height.feet + 'ft'} />
                <RocketDetailsEntry name='Mass' value={
                    rocket.rocket.mass.kg + 'kg / ' +
                    rocket.rocket.mass.lb + 'lb'} />
            </Summary>
            <Summary title='Engine information'>
                <RocketDetailsEntry name='Propellant 1' value={rocket.rocket.engines.propellant_1} />
                <RocketDetailsEntry name='Propellant 2' value={rocket.rocket.engines.propellant_2} />
                <RocketDetailsEntry name='Sea level thrust' value={
                    rocket.rocket.engines.thrust_sea_level.kN + 'kN / ' +
                    rocket.rocket.engines.thrust_sea_level.lbf + 'lbf'} />
                <RocketDetailsEntry name='Vacuum thrust' value={
                    rocket.rocket.engines.thrust_vacuum.kN + 'kN / ' +
                    rocket.rocket.engines.thrust_vacuum.lbf + 'lbf'} />
            </Summary>
        </ScrollView>
    );
};

/**
 * This function is what will be imported when RocketDetail.tsx is imported.
 */
export default function RocketDetail({ navigation, route }: { navigation: any, route: any }) {
    return (
        <View style={styles.container}>
            <RocketDetailLoader id={route.params.id} />
        </View>
    );
}

const styles = StyleSheet.create({
    /* GENERAL STYLESHEETS */
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },

    /* ITEM LIST STYLESHEETS */
    detailContainer: {
        width: '100%',
        height: '100%',
    },

    /* DATA STYLESHEETS */
    backgroundImg: {
        resizeMode: 'cover',
        width: '100%',
        tintColor: 'black',
    },
    rocketHeaderContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
        padding: 20,
    },
    rocketHeaderText: {
        color: 'white',
    },
    rocketName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    rocketCountry: {
        fontSize: 20,
        fontStyle: 'italic',
        marginBottom: 5,
    },
    rocketDescription: {
        fontSize: 15,
        marginBottom: 10,
    },
});
