import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import LoadingIndicator from '../components/LoadingIndicator';
import Summary from '../components/Summary';

const ROCKET_DETAIL_QUERY = gql`
    query GetRocketDetail ($rocketId: ID!) {
        rocket(id: $rocketId) {
            active
            boosters
            company
            country
            description
            first_flight
            id
            name
            type
            wikipedia
        }
    }
`;

/**
 * The content of the home screen. Includes loading and error handling.
 */
const RocketDetailContent = (props: any) => {
    const { data, error, loading } = useQuery(ROCKET_DETAIL_QUERY, {
        variables: {
            rocketId: props.id,
        },
    });

    if (loading) {
        return (
            <LoadingIndicator/>
        );
    }

    if (error) {
        return (
            <View>
                <Text>{error.message}</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View>
                <Text>{data.rocket.name}</Text>
                <Text>{data.rocket.country}</Text>
            </View>
            <Summary title='Launch statistics'>
                <Text>{data.rocket.first_flight}</Text>
            </Summary>
        </ScrollView>
    );
};

/**
 * This function is what will be imported when Home.tsx is imported.
 */
export default function RocketDetail({ navigation, route }: { navigation: any, route: any }) {
    return (
        <View style={styles.container}>
            <RocketDetailContent id={route.params.id}/>
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
    itemListContainer: {
        width: '100%',
    },
    itemContainer: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemContent: {

    },
});
