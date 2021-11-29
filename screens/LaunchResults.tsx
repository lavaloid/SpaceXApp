import * as React from 'react';
import { StyleSheet, Text, FlatList, View, TouchableHighlight, Button, Linking } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import LoadingIndicator from '../components/LoadingIndicator';
import { useState } from 'react';

const SEARCH_LAUNCH_QUERY = gql`
    query SearchLaunches ($rocketId: String, $launchYear: String, $missionName: String, $sort: String, $limit: Int, $offset: Int) {
        launches(find: {rocket_id: $rocketId, launch_year: $launchYear, mission_name: $missionName}, sort: $sort, 
            limit: $limit, offset: $offset) {
            id
            mission_name
            details
            launch_success
            launch_date_unix
            links {
                wikipedia
            }
        }
    }
`;

const LaunchResultLoader = (props: any) => {
    const [pageNumber, setPageNumber] = useState(0);

    const ENTRIES_PER_PAGE = 10;

    // TODO: There should be a more elegant way to detect if there is
    // a next page, but this is the best I can come up with for now.
    // The 11th element isn't rendered, but will only be used to detect
    // if there is a next page.
    const { data, error, loading } = useQuery(SEARCH_LAUNCH_QUERY, {
        variables: {
            rocketId: props.id,
            launchYear: props.launchYear,
            missionName: props.missionName,
            sort: props.sort,
            limit: ENTRIES_PER_PAGE + 1,
            offset: pageNumber * ENTRIES_PER_PAGE,
        }
    });

    if (loading) {
        return (
            <LoadingIndicator />
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
        <View style={styles.viewContainer}>
            <FlatList data={data.launches}
                renderItem={({ item, index }) => {
                    // For the 11th index we skip
                    if (index === ENTRIES_PER_PAGE) {
                        return (
                            <View></View>
                        );
                    }

                    // item.launch_date_unix is in seconds. We need to convert it to
                    // milliseconds so Date() can convert it correctly.
                    let launchDate : Date = new Date(item.launch_date_unix * 1000);
                    let launchDateStr : string = launchDate.toLocaleString();

                    return (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{item.mission_name}</Text>
                            <Text style={styles.itemDate}>{launchDateStr}</Text>
                            <Text style={styles.itemSuccess}>{item.launch_success ? 'Successful' : 'Not successful'}</Text>
                            <Text style={styles.itemDetails}>{item.details}</Text>
                            <Button title='Read more' onPress={() => {
                                Linking.openURL(item.links.wikipedia);
                            }} />
                        </View>
                    );
                }}
                style={styles.container}
            />
            <View style={styles.pageNav}>
                <TouchableHighlight onPress={() => {
                    if (pageNumber > 0) {
                        setPageNumber(pageNumber - 1);
                    }
                }} style={[styles.pageNavButton, {
                    borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                    backgroundColor: (pageNumber > 0) ? '#6688ff' : '#aaaaaa',
                }]}>
                    <Text style={styles.pageNavButtonText}>&lt;</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {
                    if (data.launches.length === ENTRIES_PER_PAGE + 1) {
                        setPageNumber(pageNumber + 1);
                    }
                }} style={[styles.pageNavButton, {
                    borderTopRightRadius: 10, borderBottomRightRadius: 10,
                    backgroundColor: (data.launches.length === ENTRIES_PER_PAGE + 1) ? '#6688ff' : '#aaaaaa',
                }]}>
                    <Text style={styles.pageNavButtonText}>&gt;</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

export default function LaunchResults({ route }: { route: any }) {
    return (
        <View style={styles.container}>
            <LaunchResultLoader id={route.params.id}
                launchYear={route.params.launchYear}
                missionName={route.params.missionName}
                sort={route.params.sort} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 10,
        height: '100%',
    },
    itemContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    itemTitle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    itemDate: {
        fontSize: 18,
        fontStyle: 'italic',
    },
    itemSuccess: {
        fontSize: 18,
    },
    itemDetails: {
        fontSize: 15,
        marginBottom: 5,
    },

    pageNav: {
        flex: 1,
        flexDirection: 'row',
        flexGrow: 0,
        minHeight: 50,
        marginBottom: 10,
        marginHorizontal: 7,
    },
    pageNavButton: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#6688ff',
        marginHorizontal: 5,
    },
    pageNavButtonText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },

    viewContainer: {
        height: '100%',
    },
});