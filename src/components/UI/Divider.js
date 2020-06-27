import React from "react";
import { StyleSheet, View } from "react-native";

const Divider = () => {
    return <View style={styles.container} />;
};

export default Divider;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
});
