import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../../constants/colors";

const ExpenseCard = (props) => {
    let labelBackgroundOneColor =
        props.labelOne === "Given" ? "#228B22" : colors.activeColor;
    let labelBackgroundTwoColor =
        props.labelTwo === "Borrowed" ? "#FF6347" : colors.activeColor;

    return (
        <View style={styles.container}>
            <View
                style={{
                    ...styles.box,
                    backgroundColor: labelBackgroundOneColor,
                }}
            >
                <Text style={styles.boxLabelText}>{props.labelOne}</Text>
                <Text style={styles.boxAmount}>Rs {props.amountOne}</Text>
            </View>
            <View
                style={{
                    ...styles.box,
                    backgroundColor: labelBackgroundTwoColor,
                }}
            >
                <Text style={styles.boxLabelText}>{props.labelTwo}</Text>
                <Text style={styles.boxAmount}>Rs {props.amountTwo}</Text>
            </View>
        </View>
    );
};

export default ExpenseCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    box: {
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        width: "48%",
        height: 120,
        borderRadius: 15,
        shadowColor: colors.activeColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    boxLabelText: {
        textAlign: "center",
        fontFamily: "open-sans-bold",
        fontSize: 20,
        color: "white",
    },
    boxAmount: {
        paddingTop: 2,
        fontFamily: "open-sans",
        fontSize: 16,
        textAlign: "center",
        color: "white",
    },
});
