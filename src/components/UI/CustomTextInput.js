import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const CustomTextInput = (props) => {
    return (
        <View style={styles.formContainer}>
            <Text style={styles.textContainer}>{props.label}</Text>
            <TextInput
                {...props}
                onChangeText={props.onChangeText}
                value={props.value}
                style={styles.textInputContainer}
            />
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    formContainer: {
        paddingVertical: 10,
    },
    textContainer: {
        paddingVertical: 10,
        fontFamily: "open-sans-bold",
    },
    textInputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 5,
    },
});
