import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, FlatList, View, Image, TouchableHighlight, useWindowDimensions, Button, Modal, TouchableWithoutFeedback } from 'react-native';

/**
 * The content of the rocket images screen. The gallery is paginated with 24 images
 * per page. The prop `images` should contain all URLs from all pages.
 * 
 * TODO: Use caching on the FlatList of Images.
 */
const ImageLoader = (props: any) => {
    const [pageNumber, setPageNumber] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImageURI, setModalImageURI] = useState('');

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const IMAGE_PER_PAGE = 24;
    const pageNum = Math.ceil(props.images.length / IMAGE_PER_PAGE)

    return (
        <View style={styles.container}>
            <Modal animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <TouchableWithoutFeedback onPress={() => { setModalVisible(false) }}>
                    <View style={styles.modalContainer}>
                        <Image source={{ uri: modalImageURI }}
                            style={{
                                width: windowWidth,
                                height: windowHeight,
                                resizeMode: 'contain',
                            }} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <FlatList
                data={props.images.slice(pageNumber * IMAGE_PER_PAGE, pageNumber * IMAGE_PER_PAGE + IMAGE_PER_PAGE)}
                renderItem={({ item }) => {
                    return (
                        <TouchableHighlight onPress={() => {
                            setModalImageURI(item);
                            setModalVisible(true);
                        }}>
                            <Image source={{ uri: item }}
                                style={{
                                    width: windowWidth / 3,
                                    height: windowWidth / 3,
                                    resizeMode: 'cover',
                                }} />
                        </TouchableHighlight>
                    )
                }}
                keyExtractor={(item) => item}
                style={styles.itemListContainer}
                numColumns={3}
            />
            <View style={styles.pageNav}>
                <TouchableHighlight onPress={() => {
                    if (pageNumber > 0) {
                        setPageNumber(pageNumber - 1);
                    }
                }} style={styles.pageNavButton}>
                    <Text style={styles.pageNavButtonText}>&lt;</Text>
                </TouchableHighlight>
                <Text style={styles.pageNavIndex}>
                    Page {pageNumber + 1} of {pageNum}
                </Text>
                <TouchableHighlight onPress={() => {
                    if (pageNumber < pageNum - 1) {
                        setPageNumber(pageNumber + 1);
                    }
                }} style={styles.pageNavButton}>
                    <Text style={styles.pageNavButtonText}>&gt;</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

/**
 * This function is what will be imported when RocketImages.tsx is imported.
 */
export default function RocketImages({ navigation, route }: { navigation: any, route: any }) {
    // Edge case: if there are no images
    if (route.params.images.launches === undefined) {
        return (
            <View style={styles.container}>
                <Text>
                    No images found.
                </Text>
            </View>
        );
    }

    // The list of images is already fetched from RocketDetail.
    // Therefore, we can reuse the same list.
    // Combine the launch images into a single array.
    let images: Array<string> = [];
    for (let launch of route.params.images.launches) {
        images = images.concat(launch.links.flickr_images);
    }

    return (
        <View style={styles.container}>
            <ImageLoader images={images} />
        </View>
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
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },

    /* ITEM LIST STYLESHEETS */
    itemListContainer: {
        width: '100%',
        height: '80%',
    },
    pageNav: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: '20%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageNavButton: {
        backgroundColor: '#6688ff',
        borderRadius: 10,
        flexGrow: 1,
    },
    pageNavButtonText: {
        paddingHorizontal: 10,
        paddingTop: 3,
        paddingBottom: 7,
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
    },
    pageNavIndex: {
        flexGrow: 5,
        textAlign: 'center',
    }
});
