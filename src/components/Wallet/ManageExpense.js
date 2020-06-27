import React from "react";
import {
    StyleSheet,
    Modal,
    View,
    Text,
    TextInput,
    Platform,
    SafeAreaView,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import Ionicons from "react-native-vector-icons/Ionicons";

import * as expenditureActions from "../../redux/actions/expenditureActions";

const ledgerSchema = yup.object({
    name: yup
        .string()
        .required("This is a required field.")
        .min(2, "Minimum 2 characters are required")
        .max(15, "Maximum 15 characters are allowed"),
    amount: yup.string().required("This is a required field."),
});

const ManageExpense = (props) => {
    const dispatch = useDispatch();

    const expenseData = useSelector((state) =>
        state.expenditures.expenditures.find(
            (e) => e.id === props.expenditureId
        )
    );

    let expenseType = expenseData
        ? expenseData.type === "GIVE_MONEY"
            ? "GiveMoney"
            : "BorrowMoney"
        : props.modalType;

    const initialValue = {
        name: expenseData ? expenseData.name : "",
        amount: expenseData ? expenseData.amount.toString() : "",
        type: expenseType,
    };

    const closeModal = () => {
        props.closeModal();
    };

    const submitHandler = async (values) => {
        try {
            if (props.expenditureId) {
                await dispatch(
                    expenditureActions.updateExpenditure(
                        props.expenditureId,
                        values.name,
                        values.amount,
                        values.type,
                        new Date().toISOString()
                    )
                );
            } else {
                await dispatch(
                    expenditureActions.addExpenditure(
                        values.name,
                        values.amount,
                        values.type,
                        new Date().toISOString()
                    )
                );
            }
            props.closeModal();
        } catch (error) {}
    };

    return (
        <SafeAreaView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.addModal}
                onRequestClose={closeModal}
            >
                <Formik
                    initialValues={initialValue}
                    onSubmit={(values) => submitHandler(values)}
                    validationSchema={ledgerSchema}
                >
                    {(props) => {
                        return (
                            <View style={styles.container}>
                                <View style={styles.iconContainer}>
                                    <View style={styles.headerContainer}>
                                        <Ionicons
                                            name="md-close"
                                            style={styles.actionButtonIcon}
                                            onPress={() => closeModal()}
                                        />
                                        <Text style={styles.headerText}>
                                            {props.values.type === "GiveMoney"
                                                ? "Give Money"
                                                : "Borrow Money"}
                                        </Text>
                                        <Ionicons
                                            name="md-done-all"
                                            style={styles.actionButtonIcon}
                                            onPress={() => props.handleSubmit()}
                                        />
                                    </View>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.labelText}>
                                            {props.values.type === "GiveMoney"
                                                ? "To: "
                                                : "From: "}
                                        </Text>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                placeholder="Start typing here"
                                                autoFocus={true}
                                                value={props.values.name}
                                                onChangeText={props.handleChange(
                                                    "name"
                                                )}
                                                onBlur={props.handleBlur(
                                                    "name"
                                                )}
                                            />
                                        </View>
                                    </View>
                                    {props.touched.name &&
                                        props.errors.name && (
                                            <Text style={styles.errorText}>
                                                {props.touched.name &&
                                                    props.errors.name}
                                            </Text>
                                        )}
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.labelText}>
                                            Amount:{" "}
                                        </Text>
                                        <View
                                            style={{
                                                ...styles.inputContainer,
                                                width: "40%",
                                                alignItems: "center",
                                                padding: 10,
                                            }}
                                        >
                                            <TextInput
                                                placeholder="0.0"
                                                keyboardType="numeric"
                                                value={props.values.amount}
                                                onChangeText={props.handleChange(
                                                    "amount"
                                                )}
                                            />
                                        </View>
                                    </View>
                                    {props.touched.amount &&
                                        props.errors.amount && (
                                            <Text style={styles.errorText}>
                                                {props.touched.amount &&
                                                    props.errors.amount}
                                            </Text>
                                        )}
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            justifyContent: "flex-end",
                                            alignItems: "flex-end",
                                        }}
                                    ></View>
                                </View>
                            </View>
                        );
                    }}
                </Formik>
            </Modal>
        </SafeAreaView>
    );
};

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "rgba(100,100,100, 0.5)",
    },
    iconContainer: {
        width: "100%",
        height: Platform.OS === "android" ? 280 : "30%",
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
    },
    actionButtonIcon: {
        fontSize: 28,
        height: 22,
        color: "black",
    },
    labelContainer: {
        paddingTop: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    labelText: { fontSize: 16, paddingRight: 10, fontFamily: "open-sans-bold" },
    inputContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 15,
        width: "80%",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginVertical: 10,
        fontFamily: "open-sans-bold",
        fontSize: 14,
    },
});
