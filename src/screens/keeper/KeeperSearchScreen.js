import React from "react";
import { StyleSheet, Text, View } from "react-native";

const KeeperSearchScreen = () => {
    return (
        <View style={styles.screen}>
            <Text> I Search for the content</Text>
        </View>
    );
};

export default KeeperSearchScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
