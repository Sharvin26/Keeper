import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
    Platform,
    Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "react-native-vector-icons";

import * as expenditureAction from "../../redux/actions/expenditureActions";

const ExpenseItem = (props) => {
    const dispatch = useDispatch();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const deleteExpense = () => {
        try {
            dispatch(expenditureAction.deleteExpenditure(props.id));
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
                        <View style={{ flexDirection: "row", padding: 10 }}>
                            <Switch
                                style={styles.switch}
                                trackColor={{
                                    false: "#767577",
                                    true: "#228B22",
                                }}
                                thumbColor={isEnabled ? "#f5dd4b" : "#FF6347"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                            <MaterialIcons
                                name="delete"
                                onPress={deleteHandler}
                                style={{
                                    fontSize:
                                        Platform.OS === "android" ? 30 : 40,
                                    marginTop:
                                        Platform.OS === "android" ? 10 : 5,
                                }}
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
        padding: 40,
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
    switch: { marginTop: 10 },
});
