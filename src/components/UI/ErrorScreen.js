import React from "react";
import { StyleSheet, Text, View } from "react-native";

import errorText from "../../constants/errorText";

const ErrorScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.errortext}>{errorText.submit.title}</Text>
            <Text style={styles.text}>{errorText.submit.message}</Text>
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
    errortext: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "open-sans-bold",
        paddingBottom: 10,
    },
    text: { textAlign: "center", fontSize: 18, fontFamily: "open-sans" },
});
