import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";

const MomentImageScreen = (props) => {
    const image = props.route.params.image;
    if (!image) {
        return (
            <View style={styles.screen}>
                <Text style={styles.textContainer}>
                    Add an Image to view it here
                </Text>
            </View>
        );
    }
    return (
        <View>
            <Image
                source={{ uri: image }}
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
            />
        </View>
    );
};

export default MomentImageScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
    },
});
