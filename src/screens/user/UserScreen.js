import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>Sign In to store the data on cloud</Text>
        </View>
    );
};

export default UserScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export const screenOptions = {
    headerTitle: "Keeper User",
};
