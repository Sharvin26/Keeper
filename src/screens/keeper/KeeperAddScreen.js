import React from "react";
import { StyleSheet, Text, View } from "react-native";

const KeeperAddScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>Add a keeper</Text>
        </View>
    );
};

export default KeeperAddScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
