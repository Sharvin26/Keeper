import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "react-native-vector-icons";

import * as expenditureAction from "../../../redux/actions/expenditureActions";

const ExpenseItem = (props) => {
    const dispatch = useDispatch();

    const toggleSwitch = async () => {
        try {
            await dispatch(
                expenditureAction.updateExpenditure(
                    props.id,
                    props.name,
                    props.amount,
                    props.type === "GIVE_MONEY" ? "GiveMoney" : "BorrowMoney",
                    new Date().toISOString(),
                    !props.isCompleted
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const deleteExpense = async () => {
        try {
            await dispatch(expenditureAction.deleteExpenditure(props.id));
        } catch (error) {
            Alert.alert(
                "Something went wrong",
                "Please try again after some time or report this bug",
                [{ text: "Okay" }]
            );
        }
    };

    const deleteHandler = () => {
        Alert.alert(
            "Are you sure?",
            "Once this expenditure is deleted, you cannot recover it again",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: () => deleteExpense(),
                    style: "destructive",
                },
            ]
        );
    };

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <View style={styles.dataContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{props.name}</Text>
                        <Text style={styles.amount}>Rs. {props.amount}</Text>
                        <Text style={styles.date}>{props.date}</Text>
                    </View>
                    <View style={styles.typeContainer}>
                        <Text
                            style={{
                                ...styles.type,
                                backgroundColor:
                                    props.type === "BORROW_MONEY"
                                        ? "#FF6347"
                                        : "#228B22",
                            }}
                        >
                            {props.type === "BORROW_MONEY"
                                ? "Borrowed"
                                : "Given"}
                        </Text>
                        <View style={styles.iconContainer}>
                            <MaterialIcons
                                name={
                                    props.isCompleted
                                        ? "check-box"
                                        : "check-box-outline-blank"
                                }
                                style={styles.iconStyle}
                                onPress={toggleSwitch}
                            />
                            <MaterialIcons
                                name="delete"
                                onPress={deleteHandler}
                                style={styles.iconStyle}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ExpenseItem;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 30,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    dataContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoContainer: { flexDirection: "column" },
    name: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
        flexWrap: "wrap",
    },
    amount: {
        paddingTop: 10,
        fontFamily: "open-sans",
        fontSize: 16,
        flexWrap: "wrap",
    },
    date: {
        paddingTop: 10,
        fontFamily: "open-sans",
        fontSize: 14,
        flexWrap: "wrap",
        color: "#a39e9e",
    },
    typeContainer: {
        flexDirection: "column",
        alignItems: "flex-end",
    },
    type: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
        flexWrap: "wrap",
        padding: 10,
        color: "white",
    },
    iconContainer: { flexDirection: "row", padding: 10 },
    iconStyle: {
        fontSize: 30,
        margin: 5,
    },
});
