import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import PropTypes from "prop-types";

import colors from "../../constants/colors";

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
            <Text style={styles.errorText}>{props.touched && props.error}</Text>
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    formContainer: {},
    textContainer: {
        paddingVertical: 5,
    },
    textInputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 5,
        fontFamily: "open-sans-bold",
    },
    errorText: {
        color: colors.errorColor,
        textAlign: "center",
        marginVertical: 10,
        fontFamily: "open-sans-bold",
        fontSize: 14,
    },
});

CustomTextInput.prototype = {
    label: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
