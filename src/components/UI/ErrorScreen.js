import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrorScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>
                Wooh!!! Something went wrong. Please report the bug from the bug
                section.
            </Text>
            <Text style={styles.text}>Thank you.</Text>
        </View>
    );
};

export default ErrorScreen;

const styles = StyleSheet.create({
    screen: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: { textAlign: "center", fontSize: 18, fontFamily: "open-sans-bold" },
});
