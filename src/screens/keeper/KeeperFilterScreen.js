import React from "react";
import { StyleSheet, Text, View } from "react-native";

const KeeperFilterScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>I filter the data</Text>
        </View>
    );
};

export default KeeperFilterScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
