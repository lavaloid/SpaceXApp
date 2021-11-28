import * as React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import HomeContainer from '../components/HomeContainer';
import RocketItem from '../components/RocketItem';

const ROCKETS_QUERY = gql`
    query GetRocketsOverview {
        rockets {
            id
            country
            name
        }
    }
`;

/**
 * The content of the home screen. Includes loading and error handling.
 */
const HomeContent = () => {
    const { data, error, loading } = useQuery(ROCKETS_QUERY);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#2233ff'/>
            </View>
        );
    }

    if (error) {
        return (
            <Text>{error.message}</Text>
        );
    }

    return (
        <FlatList
            data={data.rockets}
            renderItem={({ item }) => (
                <RocketItem name={item.name} country={item.country} />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.itemListContainer}
      />
    );
};

/**
 * This function is what will be imported when Home.tsx is imported.
 */
export default function Home({ navigation }: { navigation: any }) {
    return (
        <HomeContainer>
            <HomeContent />
        </HomeContainer>
    );
}

const styles = StyleSheet.create({
    /* GENERAL STYLESHEETS */
    container: {
        height: '100%',
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

    /* LOADING STYLESHEETS */
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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
