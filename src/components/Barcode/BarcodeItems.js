import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { MaterialIcons } from "react-native-vector-icons";
import * as barcodeActions from "../../redux/actions/barcodeActions";
import CustomWebView from "./CustomWebView";

const BarcodeItems = (props) => {
    const dispatch = useDispatch();
    const [webModal, setWebModal] = useState(false);
    const [textModal, setTextModal] = useState(false);
    const deleteBarcodeAsync = async () => {
        try {
            await dispatch(barcodeActions.deleteBarcodeDocument(props.id));
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHandler = () => {
        Alert.alert(
            "Are you sure",
            "Remember after deleting the data you cannot restore it again!!",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Okay",
                    style: "destructive",
                    onPress: () => deleteBarcodeAsync(),
                },
            ]
        );
    };

    const openHandler = () => {
        if (props.type === "url") {
            setWebModal(true);
        } else {
            console.log("There");
        }
    };

    const closeWebView = () => {
        setWebModal(false);
    };

    return (
        <View>
            <CustomWebView
                uri={props.result}
                isVisible={webModal}
                closeWebView={closeWebView}
            />
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={openHandler}
                    style={styles.iconAndTextContainer}
                >
                    <MaterialIcons
                        name={
                            props.type === "url"
                                ? "open-in-new"
                                : "insert-drive-file"
                        }
                        style={styles.iconStyle}
                    />
                    <Text style={styles.resultContainer}>{props.result}</Text>
                </TouchableOpacity>
                <MaterialIcons
                    name="delete"
                    style={styles.iconStyle}
                    onPress={() => deleteHandler()}
                />
            </View>
        </View>
    );
};

export default BarcodeItems;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    resultContainer: {
        fontSize: 16,
        fontFamily: "open-sans-bold",
        paddingLeft: 10,
    },
    iconAndTextContainer: {
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
    },
    typeContainer: { fontSize: 16, fontFamily: "open-sans" },
    iconStyle: {
        fontSize: 28,
    },
});
