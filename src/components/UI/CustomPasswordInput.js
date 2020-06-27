import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const CustomPasswordInput = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                {...props}
                secureTextEntry={true}
                style={styles.passwordInput}
                value={props.password}
            />
            {props.touched && props.error ? (
                <Text style={styles.errorText}>
                    {props.touched && props.error}
                </Text>
            ) : null}
        </View>
    );
};

export default CustomPasswordInput;

const styles = StyleSheet.create({
    container: { width: "90%", paddingBottom: 20 },
    passwordInput: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
    },
    errorText: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
        color: "red",
    },
});
